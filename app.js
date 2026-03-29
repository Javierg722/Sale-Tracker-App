let filters = new Set();

let lots = [
 {id:1, sleeve:'us', status:'open', ticker:'VOO'},
 {id:2, sleeve:'us', status:'closed', ticker:'EPD'},
 {id:3, sleeve:'intl', status:'open', ticker:'VXUS'}
];

function toggleFilter(f){
 if(filters.has(f)){filters.delete(f);} else {filters.add(f);}
 render();
}

function render(){
 let el = document.getElementById('list');
 el.innerHTML = '';

 let filtered = lots.filter(l=>{
   if(filters.size===0) return true;
   let key = l.sleeve + '-' + l.status;
   return filters.has(key);
 });

 filtered.forEach(l=>{
   let div = document.createElement('div');
   div.className='row';
   div.innerText = l.ticker + ' ('+l.sleeve+' '+l.status+')';
   div.onclick = ()=>alert('Lot '+l.id+' clicked');
   el.appendChild(div);
 });
}

render();
