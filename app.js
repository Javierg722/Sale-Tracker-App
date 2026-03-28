const STORE_KEY = "sale-tracker-pwa-v3";
const intlTickers = new Set(["VXUS","IXUS","SCHF","FTIHX"]);
let state = loadState();
seedIfEmpty();

function uid(){ return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2); }
function loadState(){ try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {lots:[],sales:[]} } catch { return {lots:[],sales:[]} } }
function saveState(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
function inferSleeve(t){ return intlTickers.has((t||"").toUpperCase().trim()) ? "International" : "U.S."; }
function currency(v){ return typeof v === "number" ? v.toLocaleString(undefined,{style:"currency",currency:"USD"}) : ""; }
function num(v){ return typeof v === "number" ? v.toLocaleString(undefined,{maximumFractionDigits:4}) : ""; }
function dateFmt(v){ if(!v) return ""; return new Date(v + "T00:00:00").toLocaleDateString(); }
function shortDateKey(v){ return v.replaceAll("-",""); }
function shortId(id){ return String(id).slice(0,6); }
function approxEqual(a,b){ return Math.abs(a-b) < 0.000001; }
function daysBetween(a,b){ return Math.round((new Date(b+"T00:00:00") - new Date(a+"T00:00:00"))/86400000); }
function lotSort(a,b){ if(a.sleeve!==b.sleeve) return a.sleeve.localeCompare(b.sleeve); if(a.buyDate!==b.buyDate) return a.buyDate.localeCompare(b.buyDate); return String(a.id).localeCompare(String(b.id)); }
function sortLots(){ state.lots.sort(lotSort); }

function seedIfEmpty(){
  if(state.lots.length || state.sales.length) return;
  state.lots.push({id:uid(),ticker:"ITOT",sleeve:"U.S.",buyDate:"2026-03-10",sharesBought:10,costPerShare:150,sharesRemaining:10,parentLotId:null,note:""});
  state.lots.push({id:uid(),ticker:"VXUS",sleeve:"International",buyDate:"2026-03-17",sharesBought:8,costPerShare:62,sharesRemaining:8,parentLotId:null,note:""});
  saveState();
}

function salesForLot(lotId){ return state.sales.filter(s => s.lotId===lotId).sort((a,b)=>a.sellDate.localeCompare(b.sellDate)); }

function realizedForLot(lot){
  const sales = salesForLot(lot.id);
  if(!sales.length) return {sharesSold:0,saleProceeds:null,realizedGainLoss:null,sellDate:"",salePricePerShare:null};
  let sharesSold=0, saleProceeds=0, realizedGainLoss=0;
  let last = sales[sales.length-1];
  for(const s of sales){
    sharesSold += s.sharesSold;
    saleProceeds += s.sharesSold * s.salePricePerShare;
    realizedGainLoss += s.sharesSold * (s.salePricePerShare - lot.costPerShare);
  }
  return {sharesSold,saleProceeds,realizedGainLoss,sellDate:last.sellDate,salePricePerShare:last.salePricePerShare};
}

function rowStatus(lot, realized){
  if(realized.sharesSold===0 && approxEqual(lot.sharesRemaining, lot.sharesBought)) return "Open lot";
  if(lot.sharesRemaining<0 || lot.sharesRemaining>lot.sharesBought) return "Check row";
  if(lot.sharesRemaining===0 && realized.sharesSold>0) return "Closed lot";
  if(lot.sharesRemaining>0 && lot.sharesRemaining<lot.sharesBought) return "Partially sold";
  return "Check row";
}

function computeWash(lot){
  const realized = realizedForLot(lot);
  if(!(realized.sharesSold>0) || !(realized.realizedGainLoss<0) || !realized.sellDate){
    return {washSale:false,candidateMatchedShares:0,candidateReplacementCount:0,suggestedReplacementLotId:"",appliedReplacementLotId:"",disallowedWashLoss:0,lossPerShare:null,matchStatus:""};
  }
  const candidates = state.lots.filter(other =>
    other.id !== lot.id &&
    other.ticker === lot.ticker &&
    other.sharesRemaining > 0 &&
    Math.abs(daysBetween(other.buyDate, realized.sellDate)) <= 30
  ).sort(lotSort);

  const matched = Math.min(realized.sharesSold, candidates.reduce((s,c)=>s+c.sharesRemaining,0));
  const lossPerShare = realized.sharesSold ? Math.abs(realized.realizedGainLoss)/realized.sharesSold : 0;
  const suggested = candidates.length === 1 ? candidates[0].id : "";
  const disallowed = matched > 0 ? matched * lossPerShare : 0;

  return {
    washSale: disallowed > 0,
    candidateMatchedShares: matched,
    candidateReplacementCount: candidates.length,
    suggestedReplacementLotId: suggested,
    appliedReplacementLotId: suggested,
    disallowedWashLoss: disallowed,
    lossPerShare,
    matchStatus: disallowed > 0 ? "Review wash match" : ""
  };
}

function computedRows(){
  const lots = [...state.lots].sort(lotSort);
  const basisIn = {};
  for(const lot of lots){
    const wash = computeWash(lot);
    if(wash.washSale && wash.appliedReplacementLotId){
      basisIn[wash.appliedReplacementLotId] = (basisIn[wash.appliedReplacementLotId] || 0) + wash.disallowedWashLoss;
    }
  }
  return lots.map((lot, idx) => {
    const realized = realizedForLot(lot);
    const wash = computeWash(lot);
    const totalCost = lot.sharesBought * lot.costPerShare;
    const basisAdjustmentIn = basisIn[lot.id] || 0;
    const adjustedTotalBasis = totalCost + basisAdjustmentIn;
    const adjustedCostPerShare = lot.sharesBought ? adjustedTotalBasis / lot.sharesBought : 0;
    return {
      trackerRow: idx + 1,
      ...lot,
      totalCost,
      saleProceeds: realized.saleProceeds,
      realizedGainLoss: realized.realizedGainLoss,
      sharesSold: realized.sharesSold,
      sellDate: realized.sellDate,
      salePricePerShare: realized.salePricePerShare,
      washSale: wash.washSale ? "Yes" : "No",
      lotIdText: `${lot.ticker}-${shortDateKey(lot.buyDate)}-R${shortId(lot.id)}`,
      lossPerShare: wash.lossPerShare,
      candidateMatchedShares: wash.candidateMatchedShares,
      candidateReplacementCount: wash.candidateReplacementCount,
      suggestedReplacementLotId: wash.suggestedReplacementLotId,
      appliedReplacementLotId: wash.appliedReplacementLotId,
      disallowedWashLoss: wash.disallowedWashLoss,
      basisAdjustmentIn,
      adjustedTotalBasis,
      adjustedCostPerShare,
      matchStatus: basisAdjustmentIn > 0 ? "Replacement lot receiving wash basis" : wash.matchStatus,
      dataEntryStatus: rowStatus(lot, realized)
    };
  });
}

function sleeveSummary(sleeve){
  const rows = computedRows().filter(r => r.sleeve === sleeve);
  return {
    openLots: rows.filter(r => r.dataEntryStatus === "Open lot" || r.dataEntryStatus === "Partially sold").length,
    washSaleCount: rows.filter(r => r.washSale === "Yes").length
  };
}

function render(){
  const rows = computedRows();
  const usRows = rows.filter(r => r.sleeve === "U.S.");
  const intlRows = rows.filter(r => r.sleeve === "International");
  const washRows = rows.filter(r => r.washSale === "Yes" && typeof r.realizedGainLoss === "number" && r.realizedGainLoss < 0);

  const usSummary = sleeveSummary("U.S.");
  const intlSummary = sleeveSummary("International");
  document.getElementById("usOpenLots").textContent = usSummary.openLots;
  document.getElementById("usWashCount").textContent = usSummary.washSaleCount;
  document.getElementById("intlOpenLots").textContent = intlSummary.openLots;
  document.getElementById("intlWashCount").textContent = intlSummary.washSaleCount;

  renderLotCards(document.getElementById("usList"), usRows);
  renderLotCards(document.getElementById("intlList"), intlRows);
  renderWashCards(document.getElementById("washList"), washRows);
}

function renderLotCards(target, rows){
  if(!rows.length){
    target.innerHTML = `<div class="empty-state">No lots in this sleeve.</div>`;
    return;
  }
  target.innerHTML = rows.map(r => `
    <article class="lot-card">
      <div class="lot-top">
        <div class="lot-meta">
          <div class="lot-ticker">${r.ticker}</div>
          <div class="lot-sub">Lot ID: ${r.lotIdText}</div>
        </div>
        <div class="badges">
          <span class="badge status">${r.dataEntryStatus}</span>
          ${r.washSale === "Yes" ? `<span class="badge wash">Wash Sale</span>` : ``}
          ${r.matchStatus ? `<span class="badge note">Note</span>` : ``}
        </div>
      </div>
      <div class="lot-core">
        <div class="core-item"><span class="label">Buy Date</span><span class="value">${dateFmt(r.buyDate)}</span></div>
        <div class="core-item"><span class="label">Shares Remaining</span><span class="value">${num(r.sharesRemaining)}</span></div>
        <div class="core-item"><span class="label">Shares Bought</span><span class="value">${num(r.sharesBought)}</span></div>
        <div class="core-item"><span class="label">Cost / Share</span><span class="value">${currency(r.costPerShare)}</span></div>
      </div>
      ${r.matchStatus ? `<div class="lot-sub" style="margin-top:10px;color:#234a73;font-weight:700">${r.matchStatus}</div>` : ``}
      <div class="actions">
        <button class="secondary-btn" onclick="openDetail('${r.id}')">Details</button>
        ${r.sharesRemaining > 0 ? `<button class="primary-btn" onclick="openSaleDialog('${r.id}')">Record Sale</button>` : ``}
      </div>
    </article>
  `).join("");
}

function renderWashCards(target, rows){
  if(!rows.length){
    target.innerHTML = `<div class="empty-state">No active wash-sale rows.</div>`;
    return;
  }
  target.innerHTML = rows.map(r => `
    <article class="lot-card">
      <div class="lot-top">
        <div class="lot-meta">
          <div class="lot-ticker">${r.ticker}</div>
          <div class="lot-sub">Sold Lot ID: ${r.lotIdText}</div>
        </div>
        <div class="badges">
          <span class="badge wash">${dateFmt(r.sellDate)}</span>
        </div>
      </div>
      <div class="lot-core">
        <div class="core-item"><span class="label">Realized Loss</span><span class="value">${currency(Math.abs(r.realizedGainLoss || 0))}</span></div>
        <div class="core-item"><span class="label">Matched Shares</span><span class="value">${num(r.candidateMatchedShares)}</span></div>
        <div class="core-item"><span class="label">Disallowed Wash Loss</span><span class="value">${currency(r.disallowedWashLoss)}</span></div>
        <div class="core-item"><span class="label">Replacement Lot ID</span><span class="value">${r.appliedReplacementLotId || ""}</span></div>
      </div>
      ${r.matchStatus ? `<div class="lot-sub" style="margin-top:10px;color:#234a73;font-weight:700">${r.matchStatus}</div>` : ``}
    </article>
  `).join("");
}

function openLotDialog(sleeve){
  document.getElementById("lotSleeve").value = sleeve;
  document.getElementById("lotTicker").value = "";
  document.getElementById("lotBuyDate").value = new Date().toISOString().slice(0,10);
  document.getElementById("lotShares").value = "";
  document.getElementById("lotCost").value = "";
  document.getElementById("lotNote").value = "";
  document.getElementById("lotDialog").showModal();
}

function openSaleDialog(lotId){
  const lot = state.lots.find(l => l.id === lotId);
  document.getElementById("saleLotId").value = lotId;
  document.getElementById("saleContext").textContent = `${lot.ticker} • Buy ${dateFmt(lot.buyDate)} • Shares Remaining ${num(lot.sharesRemaining)} • Cost/Share ${currency(lot.costPerShare)}`;
  document.getElementById("saleDate").value = new Date().toISOString().slice(0,10);
  document.getElementById("saleShares").value = "";
  document.getElementById("salePrice").value = "";
  document.getElementById("saleDialog").showModal();
}

function openDetail(lotId){
  const r = computedRows().find(x => x.id === lotId);
  if(!r) return;
  document.getElementById("detailTitle").textContent = `${r.ticker} Details`;
  document.getElementById("detailBody").innerHTML = `
    <div class="detail-section">
      <h4>Lot Details</h4>
      <div class="detail-grid">
        <div class="detail-card"><span class="label">Buy Date</span><span class="value">${dateFmt(r.buyDate)}</span></div>
        <div class="detail-card"><span class="label">Lot ID</span><span class="value">${r.lotIdText}</span></div>
        <div class="detail-card"><span class="label">Shares Bought</span><span class="value">${num(r.sharesBought)}</span></div>
        <div class="detail-card"><span class="label">Shares Remaining</span><span class="value">${num(r.sharesRemaining)}</span></div>
        <div class="detail-card"><span class="label">Cost / Share</span><span class="value">${currency(r.costPerShare)}</span></div>
        <div class="detail-card"><span class="label">Status</span><span class="value">${r.dataEntryStatus}</span></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>Sale Details</h4>
      <div class="detail-grid">
        <div class="detail-card"><span class="label">Sell Date</span><span class="value">${dateFmt(r.sellDate)}</span></div>
        <div class="detail-card"><span class="label">Sale Price / Share</span><span class="value">${currency(r.salePricePerShare)}</span></div>
        <div class="detail-card"><span class="label">Sale Proceeds</span><span class="value">${currency(r.saleProceeds)}</span></div>
        <div class="detail-card"><span class="label">Realized Gain / (Loss)</span><span class="value">${currency(r.realizedGainLoss)}</span></div>
      </div>
    </div>
    <div class="detail-section">
      <h4>Wash / Basis</h4>
      <div class="detail-grid">
        <div class="detail-card"><span class="label">Wash Sale?</span><span class="value">${r.washSale}</span></div>
        <div class="detail-card"><span class="label">Matched Shares</span><span class="value">${num(r.candidateMatchedShares)}</span></div>
        <div class="detail-card"><span class="label">Disallowed Wash Loss</span><span class="value">${currency(r.disallowedWashLoss)}</span></div>
        <div class="detail-card"><span class="label">Basis Adj In</span><span class="value">${currency(r.basisAdjustmentIn)}</span></div>
        <div class="detail-card"><span class="label">Adjusted Total Basis</span><span class="value">${currency(r.adjustedTotalBasis)}</span></div>
        <div class="detail-card"><span class="label">Adjusted Cost / Share</span><span class="value">${currency(r.adjustedCostPerShare)}</span></div>
      </div>
      ${r.matchStatus ? `<p class="lot-sub" style="margin-top:10px;color:#234a73;font-weight:700">${r.matchStatus}</p>` : ``}
    </div>
  `;
  document.getElementById("detailDialog").showModal();
}

function closeDialogs(){
  document.getElementById("lotDialog").close();
  document.getElementById("saleDialog").close();
  document.getElementById("detailDialog").close();
  document.getElementById("infoDialog").close();
}

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab + "Tab").classList.add("active");
  });
});

document.getElementById("addUsBtn").addEventListener("click", () => openLotDialog("U.S."));
document.getElementById("addIntlBtn").addEventListener("click", () => openLotDialog("International"));
document.getElementById("cancelLot").addEventListener("click", closeDialogs);
document.getElementById("cancelSale").addEventListener("click", closeDialogs);
document.getElementById("closeDetail").addEventListener("click", closeDialogs);
document.getElementById("infoBtn").addEventListener("click", () => document.getElementById("infoDialog").showModal());
document.getElementById("closeInfo").addEventListener("click", closeDialogs);

document.getElementById("lotForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const ticker = document.getElementById("lotTicker").value.trim().toUpperCase();
  const buyDate = document.getElementById("lotBuyDate").value;
  const sharesBought = parseFloat(document.getElementById("lotShares").value);
  const costPerShare = parseFloat(document.getElementById("lotCost").value);
  const note = document.getElementById("lotNote").value.trim();
  const sleeve = document.getElementById("lotSleeve").value || inferSleeve(ticker);
  if(!ticker || !buyDate || !(sharesBought > 0) || !(costPerShare > 0)){
    alert("Please complete the required buy fields.");
    return;
  }
  state.lots.push({id:uid(),ticker,sleeve,buyDate,sharesBought,costPerShare,sharesRemaining:sharesBought,parentLotId:null,note});
  sortLots();
  saveState();
  closeDialogs();
  render();
});

document.getElementById("saleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const lotId = document.getElementById("saleLotId").value;
  const sellDate = document.getElementById("saleDate").value;
  const sharesSold = parseFloat(document.getElementById("saleShares").value);
  const salePricePerShare = parseFloat(document.getElementById("salePrice").value);

  const idx = state.lots.findIndex(l => l.id === lotId);
  const lot = state.lots[idx];
  if(idx < 0 || !(sharesSold > 0) || sharesSold > lot.sharesRemaining || !(salePricePerShare > 0)){
    alert("Shares sold must be > 0 and <= shares remaining. Sale price must be > 0.");
    return;
  }

  if(sharesSold < lot.sharesRemaining){
    state.lots[idx].sharesRemaining = lot.sharesRemaining - sharesSold;
    const soldSlice = {id:uid(),ticker:lot.ticker,sleeve:lot.sleeve,buyDate:lot.buyDate,sharesBought:sharesSold,costPerShare:lot.costPerShare,sharesRemaining:0,parentLotId:lot.id,note:"Split sold slice"};
    state.lots.push(soldSlice);
    state.sales.push({id:uid(),lotId:soldSlice.id,sellDate,sharesSold,salePricePerShare});
  } else {
    state.lots[idx].sharesRemaining = 0;
    state.sales.push({id:uid(),lotId,sellDate,sharesSold,salePricePerShare});
  }
  sortLots();
  saveState();
  closeDialogs();
  render();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sale-tracker-export.json";
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById("importJson").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const parsed = JSON.parse(await file.text());
    if(!parsed.lots || !parsed.sales) throw new Error("Invalid JSON backup.");
    state = parsed;
    saveState();
    render();
    alert("Import complete.");
  } catch(err){
    alert("Import failed: " + err.message);
  } finally {
    e.target.value = "";
  }
});

if("serviceWorker" in navigator){
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
render();
