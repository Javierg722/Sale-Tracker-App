const APP_VERSION = "v6";

const STORE_KEY = "sale-tracker-pwa-v5";
const TEMPLATE_WORKBOOK_PATH = "./Sale Tracker.xlsx";
const US_START_ROW = 18;
const US_END_ROW = 378;
const INTL_START_ROW = 381;
const INTL_END_ROW = 796;
const intlTickers = new Set(["VXUS","IXUS","SCHF","FTIHX"]);
const DEFAULT_STATE = {"lots":[{"id":"row-18","ticker":"EPD","sleeve":"U.S.","buyDate":"2024-02-16","sharesBought":580.0,"costPerShare":27.25,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-19","ticker":"EPD","sleeve":"U.S.","buyDate":"2024-02-16","sharesBought":615.0,"costPerShare":27.25,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-20","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-02-18","sharesBought":580.0,"costPerShare":33.72,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-21","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-02-18","sharesBought":30.0,"costPerShare":33.72,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-22","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-02-18","sharesBought":585.0,"costPerShare":33.72,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-23","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-02-18","sharesBought":562.0,"costPerShare":33.72,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-24","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-02-18","sharesBought":580.0,"costPerShare":33.72,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-25","ticker":"EPD","sleeve":"U.S.","buyDate":"2024-02-16","sharesBought":580.0,"costPerShare":27.25,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-26","ticker":"EPD","sleeve":"U.S.","buyDate":"2024-02-16","sharesBought":351.0,"costPerShare":27.25,"sharesRemaining":0.0,"parentLotId":null,"note":""},{"id":"row-27","ticker":"ITOT","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":0.883,"costPerShare":150.63,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-28","ticker":"ITOT","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":143.0,"costPerShare":146.76,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-29","ticker":"SCHB","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":0.872,"costPerShare":25.95183486238532,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-30","ticker":"SCHB","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":813.0,"costPerShare":25.95,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-31","ticker":"EPD","sleeve":"U.S.","buyDate":"2025-10-30","sharesBought":1110.0,"costPerShare":30.53,"sharesRemaining":1110.0,"parentLotId":null,"note":""},{"id":"row-32","ticker":"VTI","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":0.251,"costPerShare":331.8326693227092,"sharesRemaining":0.251,"parentLotId":null,"note":""},{"id":"row-33","ticker":"VTI","sleeve":"U.S.","buyDate":"2026-03-17","sharesBought":212.0,"costPerShare":331.8,"sharesRemaining":212.0,"parentLotId":null,"note":""},{"id":"row-34","ticker":"VOO","sleeve":"U.S.","buyDate":"2026-03-18","sharesBought":0.993,"costPerShare":614.7331319234642,"sharesRemaining":0.993,"parentLotId":null,"note":""},{"id":"row-35","ticker":"VOO","sleeve":"U.S.","buyDate":"2026-03-18","sharesBought":40.0,"costPerShare":614.735,"sharesRemaining":40.0,"parentLotId":null,"note":""},{"id":"row-36","ticker":"VOO","sleeve":"U.S.","buyDate":"2026-03-20","sharesBought":34.0,"costPerShare":602.785,"sharesRemaining":34.0,"parentLotId":null,"note":""},{"id":"row-37","ticker":"VOO","sleeve":"U.S.","buyDate":"2026-03-20","sharesBought":0.135,"costPerShare":602.8148148148148,"sharesRemaining":0.135,"parentLotId":null,"note":""},{"id":"row-38","ticker":"VTI","sleeve":"U.S.","buyDate":"2026-03-27","sharesBought":0.736,"costPerShare":314.3478260869566,"sharesRemaining":0.736,"parentLotId":null,"note":""},{"id":"row-39","ticker":"VTI","sleeve":"U.S.","buyDate":"2026-03-27","sharesBought":63.0,"costPerShare":314.35,"sharesRemaining":63.0,"parentLotId":null,"note":""},{"id":"row-381","ticker":"IXUS","sleeve":"International","buyDate":"2026-03-17","sharesBought":157.003,"costPerShare":88.55,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-382","ticker":"IXUS","sleeve":"International","buyDate":"2026-03-17","sharesBought":0.997,"costPerShare":93.56,"sharesRemaining":0.0,"parentLotId":null,"note":"No replacement buy found"},{"id":"row-383","ticker":"VXUS","sleeve":"International","buyDate":"2026-03-17","sharesBought":178.0,"costPerShare":79.01988764044944,"sharesRemaining":178.0,"parentLotId":null,"note":""},{"id":"row-384","ticker":"VXUS","sleeve":"International","buyDate":"2026-03-17","sharesBought":0.182,"costPerShare":79.01098901098902,"sharesRemaining":0.182,"parentLotId":null,"note":""},{"id":"row-385","ticker":"VXUS","sleeve":"International","buyDate":"2026-03-20","sharesBought":177.0,"costPerShare":74.63988700564971,"sharesRemaining":177.0,"parentLotId":null,"note":""},{"id":"row-386","ticker":"VXUS","sleeve":"International","buyDate":"2026-03-20","sharesBought":0.98,"costPerShare":74.63265306122449,"sharesRemaining":0.98,"parentLotId":null,"note":""}],"sales":[{"id":"sale-18","lotId":"row-18","sellDate":"2026-03-09","sharesSold":580.0,"salePricePerShare":38.15},{"id":"sale-19","lotId":"row-19","sellDate":"2026-03-09","sharesSold":615.0,"salePricePerShare":38.15},{"id":"sale-20","lotId":"row-20","sellDate":"2026-03-09","sharesSold":580.0,"salePricePerShare":38.15},{"id":"sale-21","lotId":"row-21","sellDate":"2026-03-09","sharesSold":30.0,"salePricePerShare":38.0},{"id":"sale-22","lotId":"row-22","sellDate":"2026-03-09","sharesSold":585.0,"salePricePerShare":38.0},{"id":"sale-23","lotId":"row-23","sellDate":"2026-03-09","sharesSold":562.0,"salePricePerShare":38.0},{"id":"sale-24","lotId":"row-24","sellDate":"2026-03-09","sharesSold":580.0,"salePricePerShare":38.0},{"id":"sale-25","lotId":"row-25","sellDate":"2026-03-17","sharesSold":580.0,"salePricePerShare":37.79},{"id":"sale-26","lotId":"row-26","sellDate":"2026-03-17","sharesSold":351.0,"salePricePerShare":37.79},{"id":"sale-27","lotId":"row-27","sellDate":"2026-03-20","sharesSold":0.883,"salePricePerShare":142.93},{"id":"sale-28","lotId":"row-28","sellDate":"2026-03-20","sharesSold":143.0,"salePricePerShare":142.93},{"id":"sale-29","lotId":"row-29","sellDate":"2026-03-27","sharesSold":0.872,"salePricePerShare":24.61009174311927},{"id":"sale-30","lotId":"row-30","sellDate":"2026-03-27","sharesSold":813.0,"salePricePerShare":24.60029520295203},{"id":"sale-381","lotId":"row-381","sellDate":"2026-03-20","sharesSold":157.003,"salePricePerShare":83.55},{"id":"sale-382","lotId":"row-382","sellDate":"2026-03-20","sharesSold":0.997,"salePricePerShare":83.55}]};

let state = loadState();
seedIfEmpty();

function uid(){ return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2); }
function createEmptyState(){ return {lots:[],sales:[]}; }
function deepClone(value){ return JSON.parse(JSON.stringify(value)); }
function loadState(){ try { return normalizeState(JSON.parse(localStorage.getItem(STORE_KEY)) || createEmptyState()); } catch { return createEmptyState(); } }
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
function toNumber(value){ const numValue = typeof value === "number" ? value : Number(value); return Number.isFinite(numValue) ? numValue : null; }
function dateToIso(value){
  if(!value) return "";
  if(value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0,10);
  if(typeof value === "number" && typeof XLSX !== "undefined" && XLSX.SSF) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if(parsed) return `${parsed.y}-${String(parsed.m).padStart(2,"0")}-${String(parsed.d).padStart(2,"0")}`;
  }
  const text = String(value).trim();
  if(!text) return "";
  if(/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0,10);
  const parsedDate = new Date(text);
  if(!Number.isNaN(parsedDate.getTime())) return parsedDate.toISOString().slice(0,10);
  return "";
}

function excelDateCell(isoDate){
  if(!isoDate) return null;
  const dt = new Date(isoDate + "T00:00:00");
  return { t:"d", v: dt, z:"m/d/yyyy" };
}
function numberCell(value){
  return typeof value === "number" && Number.isFinite(value) ? { t:"n", v:value } : null;
}
function textCell(value){
  return value ? { t:"s", v:String(value) } : null;
}
function ensureCell(sheet, address){
  if(!sheet[address]) sheet[address] = { t:"z", v:null };
  return sheet[address];
}
function overwriteCell(sheet, address, cell){
  if(cell){
    const existing = sheet[address] || {};
    sheet[address] = { ...existing, ...cell };
    if(cell.t !== "s") delete sheet[address].w;
  } else {
    const existing = sheet[address] || {};
    sheet[address] = { ...existing, t:"z", v:null };
    delete sheet[address].w;
  }
}
function clearEntryRange(sheet, startRow, endRow){
  for(let row = startRow; row <= endRow; row += 1){
    for(const col of ["A","B","C","D","E","F","G","R"]){
      overwriteCell(sheet, `${col}${row}`, null);
    }
  }
}
function rowsForExport(){
  return state.lots.map(lot => {
    const sale = salesForLot(lot.id).sort((a,b)=>a.sellDate.localeCompare(b.sellDate))[0] || null;
    return {
      ticker: lot.ticker,
      sleeve: lot.sleeve,
      buyDate: lot.buyDate,
      sharesBought: lot.sharesBought,
      costPerShare: lot.costPerShare,
      sellDate: sale?.sellDate || "",
      salePricePerShare: sale?.salePricePerShare ?? null,
      sharesRemaining: lot.sharesRemaining,
      note: lot.note || ""
    };
  }).sort((a,b) => lotSort(a,b));
}
async function buildExportWorkbook(){
  const response = await fetch(TEMPLATE_WORKBOOK_PATH, { cache:"no-store" });
  if(!response.ok) throw new Error("Could not load the workbook template bundled with the app.");
  const workbook = XLSX.read(await response.arrayBuffer(), { type:"array", cellDates:true, cellStyles:true });
  const sheet = workbook.Sheets["Wash Sale Tracker"] || workbook.Sheets[workbook.SheetNames[0]];
  if(!sheet) throw new Error("Workbook template does not contain the Wash Sale Tracker sheet.");

  const usRows = rowsForExport().filter(r => r.sleeve === "U.S.");
  const intlRows = rowsForExport().filter(r => r.sleeve === "International");
  const usCapacity = US_END_ROW - US_START_ROW + 1;
  const intlCapacity = INTL_END_ROW - INTL_START_ROW + 1;
  if(usRows.length > usCapacity) throw new Error(`Too many U.S. lots to export (${usRows.length}). Workbook capacity is ${usCapacity}.`);
  if(intlRows.length > intlCapacity) throw new Error(`Too many International lots to export (${intlRows.length}). Workbook capacity is ${intlCapacity}.`);

  clearEntryRange(sheet, US_START_ROW, US_END_ROW);
  clearEntryRange(sheet, INTL_START_ROW, INTL_END_ROW);

  function writeRows(rows, startRow){
    rows.forEach((row, index) => {
      const excelRow = startRow + index;
      overwriteCell(sheet, `A${excelRow}`, textCell(row.ticker));
      overwriteCell(sheet, `B${excelRow}`, excelDateCell(row.buyDate));
      overwriteCell(sheet, `C${excelRow}`, numberCell(row.sharesBought));
      overwriteCell(sheet, `D${excelRow}`, numberCell(row.costPerShare));
      overwriteCell(sheet, `E${excelRow}`, excelDateCell(row.sellDate));
      overwriteCell(sheet, `F${excelRow}`, numberCell(row.salePricePerShare));
      overwriteCell(sheet, `G${excelRow}`, numberCell(row.sharesRemaining));
      overwriteCell(sheet, `R${excelRow}`, textCell(row.note));
    });
  }

  writeRows(usRows, US_START_ROW);
  writeRows(intlRows, INTL_START_ROW);
  return workbook;
}

function normalizeLot(raw, index){
  const ticker = String(raw?.ticker || "").trim().toUpperCase();
  const buyDate = dateToIso(raw?.buyDate);
  const sharesBought = toNumber(raw?.sharesBought);
  const costPerShare = toNumber(raw?.costPerShare);
  const sharesRemaining = toNumber(raw?.sharesRemaining);
  if(!ticker || !buyDate || sharesBought === null || costPerShare === null || sharesRemaining === null) return null;
  return {
    id: String(raw?.id || `lot-${index+1}`),
    ticker,
    sleeve: raw?.sleeve === "International" || inferSleeve(ticker) === "International" ? "International" : "U.S.",
    buyDate,
    sharesBought,
    costPerShare,
    sharesRemaining,
    parentLotId: raw?.parentLotId ? String(raw.parentLotId) : null,
    note: raw?.note ? String(raw.note) : ""
  };
}
function normalizeSale(raw, index, lotIds){
  const lotId = String(raw?.lotId || "").trim();
  const sellDate = dateToIso(raw?.sellDate);
  const sharesSold = toNumber(raw?.sharesSold);
  const salePricePerShare = toNumber(raw?.salePricePerShare);
  if(!lotId || !lotIds.has(lotId) || !sellDate || sharesSold === null || salePricePerShare === null || !(sharesSold > 0) || !(salePricePerShare > 0)) return null;
  return {
    id: String(raw?.id || `sale-${index+1}`),
    lotId,
    sellDate,
    sharesSold,
    salePricePerShare
  };
}
function normalizeState(raw){
  const lots = Array.isArray(raw?.lots) ? raw.lots.map(normalizeLot).filter(Boolean) : [];
  const lotIds = new Set(lots.map(l => l.id));
  const sales = Array.isArray(raw?.sales) ? raw.sales.map((sale, idx) => normalizeSale(sale, idx, lotIds)).filter(Boolean) : [];
  return {lots: lots.sort(lotSort), sales};
}

function seedIfEmpty(){
  if(state.lots.length || state.sales.length) return;
  state = normalizeState(deepClone(DEFAULT_STATE));
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

function parseWorkbookState(workbook){
  const sheet = workbook.Sheets["Wash Sale Tracker"] || workbook.Sheets[workbook.SheetNames[0]];
  if(!sheet) throw new Error("Workbook does not contain a readable sheet.");
  const rows = XLSX.utils.sheet_to_json(sheet, {header:1, defval:"", raw:true, blankrows:false});
  const headerIndexes = [];
  rows.forEach((row, idx) => {
    if(String(row[0] || "").trim() === "Ticker" && String(row[1] || "").trim() === "Buy Date" && String(row[2] || "").trim() === "Shares Bought") {
      headerIndexes.push(idx);
    }
  });
  if(!headerIndexes.length) throw new Error("Could not find the trade-entry table in the workbook.");

  const lots = [];
  const sales = [];
  for(const headerIndex of headerIndexes){
    for(let i = headerIndex + 1; i < rows.length; i += 1){
      const row = rows[i] || [];
      const firstCell = String(row[0] || "").trim();
      if(!firstCell) continue;
      if(firstCell === "Ticker") break;
      if(firstCell.includes("Sleeve Lots")) break;

      const ticker = firstCell.toUpperCase();
      const buyDate = dateToIso(row[1]);
      const sharesBought = toNumber(row[2]);
      const costPerShare = toNumber(row[3]);
      const sellDate = dateToIso(row[4]);
      const salePricePerShare = toNumber(row[5]);
      const sharesRemaining = toNumber(row[6]);
      const sharesSold = toNumber(row[12]);
      const note = row[23] ? String(row[23]).trim() : "";

      if(!ticker || !buyDate || sharesBought === null || costPerShare === null || sharesRemaining === null) continue;

      const lotId = `xlsx-row-${i+1}`;
      lots.push({
        id: lotId,
        ticker,
        sleeve: inferSleeve(ticker),
        buyDate,
        sharesBought,
        costPerShare,
        sharesRemaining,
        parentLotId: null,
        note
      });

      if(sellDate && sharesSold !== null && sharesSold > 0 && salePricePerShare !== null && salePricePerShare > 0){
        sales.push({
          id: `xlsx-sale-${i+1}`,
          lotId,
          sellDate,
          sharesSold,
          salePricePerShare
        });
      }
    }
  }
  if(!lots.length) throw new Error("No trade rows were found in the workbook.");
  return normalizeState({lots, sales});
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

document.getElementById("exportBtn").addEventListener("click", async () => {
  try{
    const workbook = await buildExportWorkbook();
    const dateStamp = new Date().toISOString().slice(0,10);
    XLSX.writeFile(workbook, `Sale Tracker - app export - ${dateStamp}.xlsx`, { cellStyles:true });
  } catch(err){
    alert("Spreadsheet export failed: " + err.message);
  }
});

document.getElementById("importJson").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const parsed = JSON.parse(await file.text());
    state = normalizeState(parsed);
    if(!state.lots.length) throw new Error("Invalid JSON backup.");
    saveState();
    render();
    alert("JSON import complete.");
  } catch(err){
    alert("Import failed: " + err.message);
  } finally {
    e.target.value = "";
  }
});

document.getElementById("importXlsx").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  try{
    const workbook = XLSX.read(await file.arrayBuffer(), {type:"array", cellDates:true});
    const imported = parseWorkbookState(workbook);
    if(!imported.lots.length) throw new Error("No lots were imported.");
    state = imported;
    saveState();
    render();
    alert(`Spreadsheet import complete. Loaded ${state.lots.length} lots and ${state.sales.length} sales.`);
  } catch(err){
    alert("Spreadsheet import failed: " + err.message);
  } finally {
    e.target.value = "";
  }
});

async function registerServiceWorker(){
  if(!("serviceWorker" in navigator)) return;
  try{
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if(refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    const reg = await navigator.serviceWorker.register(`./sw.js?${APP_VERSION}`);
    reg.update().catch(() => {});

    const promptForRefresh = (worker) => {
      if(!worker) return;
      worker.addEventListener("statechange", () => {
        if(worker.state === "installed" && navigator.serviceWorker.controller){
          worker.postMessage({type:"SKIP_WAITING"});
        }
      });
    };

    promptForRefresh(reg.installing);
    reg.addEventListener("updatefound", () => promptForRefresh(reg.installing));
  } catch(err){
    console.warn("Service worker registration failed", err);
  }
}

window.addEventListener("load", registerServiceWorker);
render();
