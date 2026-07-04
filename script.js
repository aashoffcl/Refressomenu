const SAR_EN = "SAR", SAR_AR = "ر.س";

const menu = {
  coffee: {
    icon:"☕", en:"Coffee", ar:"القهوة",
    items:[
      {en:"Spanish Latte", ar:"لاتيه إسباني", price:"15/18", cal:"180–270"},
      {en:"Latte", ar:"لاتيه", price:"13/16", cal:"130–200"},
      {en:"Cappuccino", ar:"كابتشينو", price:"9/13", cal:"130–220"},
      {en:"Flat White", ar:"فلات وايت", price:"13/16", cal:"53–168"},
      {en:"Americano", ar:"أمريكانو", price:"10/14", cal:"30–70"},
      {en:"Espresso", ar:"إسبريسو", price:"7/10", cal:"25–45"},
      {en:"Arabic Coffee", ar:"قهوة عربية", price:"6/8", cal:"20–45"},
      {en:"Turkish Coffee", ar:"قهوة تركية", price:"9/12", cal:"43–50"},
      {en:"Mocha Latte", ar:"موكا لاتيه", price:"13/16", cal:"130–210"},
      {en:"V60", ar:"في 60", price:"14/17", cal:"80–110"},
      {en:"Pistachio", ar:"بيستاشيو", price:"15/18", cal:"", isNew:true},
      {en:"Coffee Today", ar:"قهوة اليوم", price:"8/10", cal:"", isNew:true}
    ]
  },
  tea: {
    icon:"🍵", en:"Tea", ar:"الشاي",
    items:[
      {en:"Tea", ar:"شاي", price:"3", cal:"40"},
      {en:"Karak", ar:"شاي كرك", price:"6", cal:"55"},
      {en:"English Tea", ar:"شاي إنجليزي", price:"4", cal:"34"},
      {en:"Ginger Milk", ar:"حليب زنجبيل", price:"6", cal:"50"}
    ]
  },
  drinks: {
    icon:"🥤", en:"Drinks & Shakes", ar:"مشروبات وعصائر",
    items:[
      {en:"Mojito", ar:"موهيتو", price:"14", cal:"160–300"},
      {en:"Lemon Mint Juice", ar:"عصير ليمون بالنعناع", price:"13", cal:"70–160"},
      {en:"Cocktail", ar:"مشكل", price:"13", cal:"90–210"},
      {en:"Mango Juice", ar:"عصير مانجو", price:"13", cal:"90–220"},
      {en:"Avocado Juice", ar:"عصير أفوكادو", price:"15", cal:"140–240"}
    ]
  },
  snacks: {
    icon:"🥐", en:"Snacks", ar:"سناكس",
    items:[
      {en:"Croissant", ar:"كرواسان", price:"7", cal:"350"},
      {en:"Donut", ar:"دونات", price:"6", cal:"190"},
      {en:"Brownie", ar:"براوني", price:"10", cal:"330"},
      {en:"Cheesecake", ar:"تشيز كيك", price:"14", cal:"330–450"}
    ]
  }
};

const signature = [
  {key:"pistachio", icon:"☕", en:"Pistachio", ar:"بيستاشيو", price:"15/18"},
  {key:"spanish", icon:"☕", en:"Spanish Latte", ar:"لاتيه إسباني", price:"15/18"},
  {key:"mocha", icon:"🍫", en:"Mocha Latte", ar:"موكا لاتيه", price:"13/16"},
  {key:"v60", icon:"⏳", en:"V60", ar:"في 60", price:"14/17"}
];

function priceHTML(price){
  const parts = price.split("/");
  if(parts.length===2){
    return `${parts[0]} / ${parts[1]}<small><span class="en-text">${SAR_EN}</span><span class="ar-text">${SAR_AR}</span></small>`;
  }
  return `${price}<small><span class="en-text">${SAR_EN}</span><span class="ar-text">${SAR_AR}</span></small>`;
}

// Build signature strip
const sigRow = document.getElementById('sig-row');
signature.forEach(s=>{
  const card = document.createElement('div');
  card.className = 'sig-card';
  card.innerHTML = `
    <div class="badge"><span class="en-text">Signature</span><span class="ar-text">مميز</span></div>
    <div class="icon">${s.icon}</div>
    <h3><span class="en-text">${s.en}</span><span class="ar-text">${s.ar}</span></h3>
    <div class="price">${priceHTML(s.price)}</div>
  `;
  sigRow.appendChild(card);
});

// Build category cards + menu lists
const catGrid = document.getElementById('cat-grid');
const menuPanel = document.getElementById('menu-panel');
let activeCat = null;

Object.keys(menu).forEach(key=>{
  const cat = menu[key];

  const card = document.createElement('div');
  card.className = 'cat-card';
  card.id = 'cat-' + key;
  card.innerHTML = `
    <span class="cat-icon">${cat.icon}</span>
    <span class="cat-name"><span class="en-text">${cat.en}</span><span class="ar-text">${cat.ar}</span></span>
    <span class="cat-count">${cat.items.length} <span class="en-text">items</span><span class="ar-text">صنف</span></span>
  `;
  card.onclick = () => toggleCat(key);
  catGrid.appendChild(card);

  const list = document.createElement('div');
  list.className = 'menu-list';
  list.id = 'list-' + key;
  list.innerHTML = cat.items.map(it => `
    <div class="menu-item ${it.isNew ? 'is-new' : ''}">
      <div class="m-icon">${cat.icon}</div>
      <div class="m-body">
        <div class="m-name">
          <span class="en-text">${it.en}</span><span class="ar-text">${it.ar}</span>
        </div>
        ${it.cal ? `<div class="m-cal"><span class="en-text">${it.cal} cal</span><span class="ar-text">${it.cal} سعرة</span></div>` : ''}
      </div>
      <div class="m-price">${priceHTML(it.price)}</div>
    </div>
  `).join('');
  menuPanel.appendChild(list);
});

function toggleCat(key){
  const wasActive = activeCat === key;
  Object.keys(menu).forEach(k=>{
    document.getElementById('cat-'+k).classList.remove('active');
    document.getElementById('list-'+k).classList.remove('show');
  });
  if(!wasActive){
    document.getElementById('cat-'+key).classList.add('active');
    document.getElementById('list-'+key).classList.add('show');
    activeCat = key;
    document.getElementById('list-'+key).scrollIntoView({behavior:'smooth', block:'nearest'});
  } else {
    activeCat = null;
  }
}

// default open coffee
toggleCat('coffee');

function setLang(lang){
  document.body.classList.remove('lang-en','lang-ar');
  document.body.classList.add('lang-' + lang);
  document.getElementById('btn-en').classList.toggle('active', lang==='en');
  document.getElementById('btn-ar').classList.toggle('active', lang==='ar');
  document.documentElement.lang = lang;
}
