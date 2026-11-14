const screen = document.querySelector('#screen');
const modalLayer = document.querySelector('#modalLayer');
const toast = document.querySelector('#toast');
const backButton = document.querySelector('#backButton');

const initialProducts = [
  { id: 1, name: 'Tomatoes', icon: '🍅', qty: '3 units', category: 'Vegetables', days: 2 },
  { id: 2, name: 'Spinach', icon: '🥬', qty: '1 bag', category: 'Vegetables', days: 1 },
  { id: 3, name: 'Onion', icon: '🧅', qty: '2 units', category: 'Vegetables', days: 9 },
  { id: 4, name: 'Rice', icon: '🍚', qty: '1 pack', category: 'Pantry', days: 120 },
  { id: 5, name: 'Eggs', icon: '🥚', qty: '6 units', category: 'Dairy', days: 12 }
];

const recipes = [
  { id: 'ratatouille', name: 'Ratatouille', icon: '🍲', art: 'orange', time: 55, difficulty: 'Medium', match: 'You have everything', missing: 0, full: true, description: 'A colourful vegetable classic that uses the ingredients closest to expiry.' },
  { id: 'spinach-rice', name: 'Spinach rice bowl', icon: '🍛', art: 'green', time: 25, difficulty: 'Easy', match: 'You have everything', missing: 0, full: false, description: 'Fast, comforting and ideal for using fresh spinach.' },
  { id: 'omelette', name: 'Garden omelette', icon: '🍳', art: 'yellow', time: 15, difficulty: 'Easy', match: 'Missing cheese', missing: 1, full: false, description: 'A quick omelette with vegetables and herbs.' },
  { id: 'pasta', name: 'Tomato basil pasta', icon: '🍝', art: 'orange', time: 30, difficulty: 'Easy', match: 'Missing basil', missing: 1, full: false, description: 'Simple pasta with a bright tomato sauce.' }
];

const cookingSteps = [
  { title: 'Prep the vegetables', icon: '🔪', text: 'Wash the courgette, aubergine, peppers and tomatoes. Cut them into even slices.', media: 'Knife skills demonstration' },
  { title: 'Make the tomato sauce', icon: '🥫', text: 'Sauté the onion and garlic, then add the tomatoes. Simmer until slightly thickened.', media: 'Sauce technique demonstration' },
  { title: 'Arrange the vegetables', icon: '🥒', text: 'Layer the vegetable slices in the dish, alternating colours. Season lightly.', media: 'Layering demonstration' },
  { title: 'Bake for 25 minutes', icon: '⏱️', text: 'Place the dish in the oven. The timer starts automatically; continue to the next preparation step while it runs.', media: 'Oven and timer demonstration', timer: 25 },
  { title: 'Prepare the finishing oil', icon: '🌿', text: 'While the ratatouille bakes, mix olive oil, herbs and a pinch of salt.', media: 'Herb oil demonstration', parallel: true },
  { title: 'Finish and serve', icon: '🍲', text: 'Remove the dish from the oven, spoon over the herb oil and serve warm.', media: 'Plating demonstration' }
];

let state;
let route = 'home';
let history = [];
let activeRecipe = null;
let inventoryFilter = 'All';
let inventoryQuery = '';
let recipeQuery = '';
let recipeFilter = 'All';
let cookStep = 0;
let timerSeconds = 0;
let timerInterval = null;

function resetState(showMessage = false) {
  state = {
    products: structuredClone(initialProducts),
    shopping: [
      { name: 'Milk', qty: '1 litre', done: false },
      { name: 'Cheese', qty: '200 g', done: false },
      { name: 'Basil', qty: '1 bunch', done: true }
    ]
  };
  stopTimer();
  route = 'home'; history = []; activeRecipe = null; cookStep = 0;
  render();
  if (showMessage) showToast('Prototype reset — all scenarios are ready.');
}

function go(next, push = true) {
  if (push && route !== next) history.push(route);
  route = next;
  modalLayer.innerHTML = '';
  screen.scrollTop = 0;
  render();
}

function goBack() {
  if (route === 'cooking') { go('recipe-detail', false); return; }
  go(history.pop() || 'home', false);
}

function render() {
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
  backButton.classList.toggle('is-hidden', ['home','recipes','inventory','shopping','other'].includes(route));
  document.querySelector('.bottom-nav').style.display = route === 'cooking' ? 'none' : 'grid';
  const renderers = { home: renderHome, inventory: renderInventory, recipes: renderRecipes, 'recipe-detail': renderRecipeDetail, cooking: renderCooking, shopping: renderShopping, other: renderOther };
  (renderers[route] || renderHome)();
  bindRouteButtons();
}

function bindRouteButtons() {
  document.querySelectorAll('[data-route]').forEach(el => el.onclick = () => go(el.dataset.route));
}

function renderHome() {
  const expiring = state.products.filter(p => p.days <= 3).length;
  screen.innerHTML = `
    <p class="eyebrow">Your kitchen, one step ahead</p>
    <h1>Good evening, Bruno.</h1>
    <p class="subtitle">What shall we cook today?</p>
    <div class="search-wrap"><input class="search" id="homeSearch" placeholder="Search recipes or ingredients…" aria-label="Search recipes or ingredients"></div>
    <div class="quick-grid">
      <button class="quick-action" data-route="recipes"><span>🍽</span>Find recipes</button>
      <button class="quick-action" data-route="inventory"><span>▣</span>Add product</button>
      <button class="quick-action" data-route="shopping"><span>🛒</span>Shopping list</button>
      <button class="quick-action" id="expiryShortcut"><span>⏳</span>Expiring soon</button>
    </div>
    <div class="section-heading"><h2>Suggested for you</h2><button class="text-button" data-route="recipes">See all</button></div>
    ${featureRecipe(recipes[0])}
    <div class="section-heading"><h2>Your inventory</h2><button class="text-button" data-route="inventory">View all</button></div>
    <div class="stats">
      <div class="stat"><strong>${state.products.length}</strong><span>items available</span></div>
      <div class="stat warn"><strong>${expiring}</strong><span>expiring soon</span></div>
      <div class="stat alert"><strong>2</strong><span>running low</span></div>
    </div>`;
  document.querySelector('.recipe-feature').onclick = () => openRecipe('ratatouille');
  document.querySelector('#expiryShortcut').onclick = () => { inventoryFilter = 'Expiring'; go('inventory'); };
  document.querySelector('#homeSearch').onkeydown = e => { if (e.key === 'Enter') { recipeQuery = e.target.value; go('recipes'); } };
}

function featureRecipe(r) {
  return `<article class="card recipe-feature" tabindex="0" role="button" aria-label="Open ${r.name}">
    <div class="food-art ${r.art}"><span>${r.icon}</span></div>
    <div class="recipe-copy"><h3>${r.name}</h3><div class="meta-row"><span>◷ ${r.time} min</span><span>◇ ${r.difficulty}</span></div><span class="status-chip">✓ ${r.match}</span></div>
  </article>`;
}

function renderInventory() {
  let items = [...state.products];
  if (inventoryFilter === 'Expiring') items = items.filter(p => p.days <= 3);
  else if (inventoryFilter !== 'All') items = items.filter(p => p.category === inventoryFilter);
  if (inventoryQuery) items = items.filter(p => p.name.toLowerCase().includes(inventoryQuery.toLowerCase()));
  const sort = window.inventorySort || 'expiry';
  if (sort === 'expiry') items.sort((a,b) => a.days - b.days);
  if (sort === 'name') items.sort((a,b) => a.name.localeCompare(b.name));
  screen.innerHTML = `
    <p class="eyebrow">Scenario 1</p><h1>Inventory</h1><p class="subtitle">Track what you have and use it before it expires.</p>
    <div class="search-wrap"><input class="search" id="inventorySearch" value="${escapeHtml(inventoryQuery)}" placeholder="Search ingredients…"></div>
    <div class="toolbar">
      ${['All','Vegetables','Dairy','Pantry','Expiring'].map(x => `<button class="chip ${inventoryFilter===x?'active':''}" data-filter="${x}">${x}</button>`).join('')}
      <select class="sort-select" id="sortProducts" aria-label="Sort products"><option value="expiry" ${sort==='expiry'?'selected':''}>Expiry first</option><option value="name" ${sort==='name'?'selected':''}>A–Z</option></select>
    </div>
    <p class="results-count">${items.length} products · sorted by ${sort === 'expiry' ? 'expiry date' : 'name'}</p>
    <div class="product-list">${items.length ? items.map(productCard).join('') : `<div class="empty-state"><span>🥕</span>No products match this view.</div>`}</div>
    <button class="fab" id="addProduct" aria-label="Add product">+</button>`;
  document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { inventoryFilter = b.dataset.filter; renderInventory(); });
  document.querySelector('#sortProducts').onchange = e => { window.inventorySort = e.target.value; renderInventory(); };
  document.querySelector('#inventorySearch').oninput = e => { inventoryQuery = e.target.value; renderInventory(); document.querySelector('#inventorySearch').focus(); };
  document.querySelector('#addProduct').onclick = openAddMethod;
}

function productCard(p) {
  return `<article class="card product-card"><div class="product-icon">${p.icon}</div><div><h3>${p.name}</h3><p>${p.qty}</p><p class="expiry ${p.days <= 3 ? 'soon':''}">${p.days <= 1 ? 'Expires tomorrow' : `Expires in ${p.days} days`}</p></div><button class="kebab" aria-label="More options for ${p.name}">⋮</button></article>`;
}

function openAddMethod() {
  openModal(`<div class="modal-handle"></div><p class="eyebrow">Add to inventory</p><h2>How would you like to add it?</h2><p class="subtitle">Scanning is quickest. You can check the details before saving.</p><div class="method-grid"><button class="method primary-method" id="scanMethod"><span>▥</span>Scan barcode</button><button class="method" id="manualMethod"><span>✎</span>Add manually</button></div>`);
  document.querySelector('#scanMethod').onclick = openScanner;
  document.querySelector('#manualMethod').onclick = () => openProductForm();
}

function openScanner() {
  openModal(`<div class="modal-handle"></div><p class="eyebrow">Scan barcode</p><h2>Point the barcode at the camera</h2><div class="scanner"><div class="scanner-box"><div class="scanner-line"></div></div></div><button class="primary" id="simulateScan" style="width:100%;margin-top:14px">Simulate milk barcode</button><button class="text-button" id="manualInstead" style="width:100%;margin-top:8px">Enter details manually instead</button>`);
  document.querySelector('#simulateScan').onclick = () => openProductForm({ name:'Milk', icon:'🥛', qty:1, unit:'litre', days:5, scanned:true });
  document.querySelector('#manualInstead').onclick = () => openProductForm();
}

function openProductForm(data = {}) {
  const scanned = data.scanned;
  openModal(`<div class="modal-handle"></div><p class="eyebrow">${scanned?'Product found':'Manual entry'}</p><h2>${scanned?'Milk':'Add a product'}</h2>${scanned?'<div class="availability-banner">✓ Barcode recognised. Check the details before saving.</div>':''}<form class="form-grid" id="productForm"><div class="field"><label>Product name</label><input name="name" required value="${data.name||''}" placeholder="e.g. Milk"></div><div class="field"><label>Quantity</label><input name="quantity" type="number" min="1" required value="${data.qty||1}"></div><div class="field"><label>Unit</label><select name="unit"><option>unit</option><option ${data.unit==='litre'?'selected':''}>litre</option><option>pack</option><option>grams</option></select></div><div class="field"><label>Expiry date</label><input name="expiry" type="date" required value="2026-11-19"></div><button class="primary" type="submit">Add to inventory</button></form>`);
  document.querySelector('#productForm').onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); const name = fd.get('name');
    const icons = { milk:'🥛', cheese:'🧀', bread:'🍞', apple:'🍎' };
    state.products = state.products.filter(p => p.name.toLowerCase() !== name.toLowerCase());
    state.products.push({ id:Date.now(), name, icon:icons[name.toLowerCase()]||'🥫', qty:`${fd.get('quantity')} ${fd.get('unit')}`, category: name.toLowerCase()==='milk'?'Dairy':'Pantry', days:5 });
    closeModal(); inventoryFilter='All'; renderInventory(); showToast(`✓ ${name} added to your inventory.`);
  };
}

function renderRecipes() {
  let list = recipes.filter(r => r.name.toLowerCase().includes(recipeQuery.toLowerCase()));
  if (recipeFilter === 'Under 30 min') list = list.filter(r => r.time <= 30);
  if (recipeFilter === 'I have everything') list = list.filter(r => r.missing === 0);
  screen.innerHTML = `
    <p class="eyebrow">Scenario 2</p><h1>Find a recipe</h1><p class="subtitle">Suggestions use your inventory and prioritise ingredients close to expiry.</p>
    <div class="availability-banner">🥬 Spinach expires tomorrow · recipes using it appear first.</div>
    <div class="search-wrap"><input class="search" id="recipeSearch" value="${escapeHtml(recipeQuery)}" placeholder="What would you like to cook?"></div>
    <div class="toolbar">${['All','I have everything','Under 30 min'].map(x => `<button class="chip ${recipeFilter===x?'active':''}" data-recipe-filter="${x}">${x}</button>`).join('')}</div>
    <p class="results-count">${list.length} matching recipes</p>
    <div class="recipe-list">${list.map(recipeCard).join('')}</div>`;
  document.querySelector('#recipeSearch').oninput = e => { recipeQuery=e.target.value; renderRecipes(); document.querySelector('#recipeSearch').focus(); };
  document.querySelectorAll('[data-recipe-filter]').forEach(b => b.onclick = () => { recipeFilter=b.dataset.recipeFilter; renderRecipes(); });
  document.querySelectorAll('[data-recipe]').forEach(c => c.onclick = () => openRecipe(c.dataset.recipe));
}

function recipeCard(r) {
  return `<article class="card recipe-card" data-recipe="${r.id}" tabindex="0" role="button"><div class="food-art ${r.art}"><span>${r.icon}</span></div><div class="recipe-copy"><h3>${r.name}</h3><div class="meta-row"><span>◷ ${r.time} min</span><span>◇ ${r.difficulty}</span></div><span class="status-chip ${r.missing?'missing':''}">${r.missing?'!':'✓'} ${r.match}</span></div></article>`;
}

function openRecipe(id) { activeRecipe = recipes.find(r => r.id === id); go('recipe-detail'); }

function renderRecipeDetail() {
  const r = activeRecipe || recipes[0]; activeRecipe = r;
  const baseIngredients = r.id === 'ratatouille'
    ? [['Courgette','1','yes'],['Aubergine','1','yes'],['Tomatoes','3','yes'],['Red pepper','1','yes'],['Onion','1','yes'],['Garlic','2 cloves','yes'],['Fresh herbs','1 bunch','yes']]
    : [['Main ingredients','From inventory','yes'],[r.missing?'Missing ingredient':'Seasoning',r.missing?'Add to shopping list':'To taste',r.missing?'no':'yes']];
  screen.innerHTML = `<div class="hero-card"><div class="food-art ${r.art}"><span>${r.icon}</span></div></div><div class="detail-body"><p class="eyebrow">Recipe preview</p><h1>${r.name}</h1><p class="subtitle">${r.description}</p><div class="meta-row"><span>◷ ${r.time} min</span><span>◇ ${r.difficulty}</span><span>♙ 2 servings</span></div><div class="availability-banner">${r.missing?'! You are missing 1 ingredient. Review it below before cooking.':'✓ You have every required ingredient in your inventory.'}</div><div class="section-heading"><h2>Ingredients</h2><span class="status-chip ${r.missing?'missing':''}">${r.missing?'1 missing':'All available'}</span></div><div class="ingredient-list">${baseIngredients.map(i => `<div class="ingredient-row"><span class="check ${i[2]==='no'?'no':''}">${i[2]==='no'?'!':'✓'}</span><span>${i[0]}</span><strong>${i[1]}</strong></div>`).join('')}</div><div class="detail-actions"><button class="secondary" id="shoppingFromRecipe">${r.missing?'Add missing item':'Save recipe'}</button><button class="primary" id="startCooking">Start cooking →</button></div>${!r.full?'<p class="subtitle" style="font-size:12px">This recipe is available for discovery and ingredient review. Ratatouille contains the complete guided cooking demonstration.</p>':''}</div>`;
  document.querySelector('#shoppingFromRecipe').onclick = () => { if(r.missing){ state.shopping.unshift({name:r.match.replace('Missing ',''),qty:'1',done:false}); showToast('Added to the shopping list.'); } else showToast('Recipe saved for this demo session.'); };
  document.querySelector('#startCooking').onclick = () => {
    if (!r.full) { showToast('Guided cooking is demonstrated with Ratatouille.'); setTimeout(()=>openRecipe('ratatouille'),900); }
    else { cookStep=0; go('cooking'); }
  };
}

function renderCooking() {
  const step = cookingSteps[cookStep];
  const pct = ((cookStep+1)/cookingSteps.length)*100;
  const done = cookStep >= cookingSteps.length;
  if (done) { renderCompletion(); return; }
  if (step.timer && timerSeconds === 0) startTimer(step.timer * 60);
  screen.innerHTML = `<div class="cook-screen"><div class="cook-top"><div class="cook-progress-label"><span>Step ${cookStep+1} of ${cookingSteps.length}</span><span>${Math.round(pct)}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>${timerSeconds>0?`<div class="parallel-timer"><span>⏱ Ratatouille baking</span><strong id="compactTimer">${formatTime(timerSeconds)}</strong></div>`:''}</div><div class="step-content"><div class="step-media"><span>${step.icon}</span><button class="play-button" id="playDemo" aria-label="Play step demonstration">▶</button><span class="video-caption">${step.media}</span></div><div class="step-copy"><p class="eyebrow">${step.parallel?'Parallel task':'Guided cooking'}</p><h1>${step.title}</h1><p>${step.text}</p>${step.timer?`<div class="timer-large" id="largeTimer">${formatTime(timerSeconds)}</div>`:''}</div></div><div class="cook-controls"><button class="secondary" id="previousStep" ${cookStep===0?'disabled':''}>← Previous</button><button class="secondary" id="repeatStep">↻ Repeat</button><button class="primary" id="nextStep">${cookStep===cookingSteps.length-1?'Finish':'Next →'}</button></div><button class="voice-bar" id="voiceControl">🎙 <span>Use voice controls</span></button></div>`;
  document.querySelector('#previousStep').onclick = () => { if(cookStep>0){cookStep--;renderCooking();} };
  document.querySelector('#nextStep').onclick = () => { cookStep++; renderCooking(); };
  document.querySelector('#repeatStep').onclick = () => { showToast(`Repeating: ${step.text}`); };
  document.querySelector('#playDemo').onclick = e => { e.currentTarget.textContent = '❚❚'; showToast('Step demonstration playing.'); setTimeout(()=>{if(document.querySelector('#playDemo')) document.querySelector('#playDemo').textContent='▶';},2200); };
  document.querySelector('#voiceControl').onclick = startVoiceDemo;
}

function renderCompletion() {
  screen.innerHTML = `<div class="cook-screen"><div class="step-content completion"><div class="big-icon">🎉</div><p class="eyebrow">Recipe complete</p><h1>Ratatouille is ready.</h1><p class="subtitle">Great work. Your parallel timer and all six steps are complete.</p><button class="primary" id="finishRecipe" style="width:100%;margin-top:22px">Done — return home</button></div></div>`;
  document.querySelector('#finishRecipe').onclick = () => { stopTimer(); go('home'); showToast('Bon appétit!'); };
}

function startVoiceDemo() {
  const bar = document.querySelector('#voiceControl'); if(!bar) return;
  bar.classList.add('listening'); bar.innerHTML='● <span>Listening… say “next”, “previous” or “repeat”</span>';
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition(); recognition.lang='en-US'; recognition.interimResults=false;
    recognition.onresult = e => handleVoice(e.results[0][0].transcript.toLowerCase());
    recognition.onerror = () => showVoiceChoices(); recognition.onend = () => { if(document.querySelector('#voiceControl')) document.querySelector('#voiceControl').classList.remove('listening'); };
    recognition.start();
  } else setTimeout(showVoiceChoices, 650);
}

function showVoiceChoices() {
  openModal(`<div class="modal-handle"></div><p class="eyebrow">Voice control demo</p><h2>Choose what the evaluator said</h2><p class="subtitle">In supported browsers, the microphone can recognise these commands directly.</p><div class="form-grid">${['Next','Previous','Repeat'].map(x=>`<button class="secondary voice-choice" data-command="${x.toLowerCase()}">“${x}”</button>`).join('')}</div>`);
  document.querySelectorAll('.voice-choice').forEach(b=>b.onclick=()=>{closeModal();handleVoice(b.dataset.command);});
}

function handleVoice(command) {
  if(command.includes('next')) { cookStep++; renderCooking(); showToast('Voice command recognised: Next'); }
  else if(command.includes('previous')) { cookStep=Math.max(0,cookStep-1); renderCooking(); showToast('Voice command recognised: Previous'); }
  else if(command.includes('repeat')) showToast(`Repeating: ${cookingSteps[cookStep].text}`);
  else showToast('Command not recognised. Try “next”, “previous” or “repeat”.');
}

function startTimer(seconds) {
  timerSeconds = seconds; clearInterval(timerInterval);
  timerInterval = setInterval(()=>{ timerSeconds=Math.max(0,timerSeconds-1); updateTimers(); if(timerSeconds===0) { clearInterval(timerInterval); showToast('⏱ Baking timer complete.'); } },1000);
}
function stopTimer(){ clearInterval(timerInterval); timerInterval=null; timerSeconds=0; }
function updateTimers(){ document.querySelectorAll('#compactTimer,#largeTimer').forEach(x=>x.textContent=formatTime(timerSeconds)); }
function formatTime(s){ return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }

function renderShopping() {
  screen.innerHTML = `<p class="eyebrow">Supporting feature</p><h1>Shopping</h1><p class="subtitle">Missing ingredients can move here directly from recipes.</p><div class="card">${state.shopping.map((i,idx)=>`<label class="shopping-row ${i.done?'done':''}"><input type="checkbox" data-shopping="${idx}" ${i.done?'checked':''}><span><strong>${i.name}</strong><br><small>${i.qty}</small></span><button class="kebab" type="button">⋮</button></label>`).join('')}</div><button class="secondary" id="addShopping" style="width:100%;margin-top:14px">+ Add another item</button>`;
  document.querySelectorAll('[data-shopping]').forEach(c=>c.onchange=()=>{state.shopping[c.dataset.shopping].done=c.checked;renderShopping();});
  document.querySelector('#addShopping').onclick=()=>showToast('Manual shopping entry is outside the three evaluated scenarios.');
}

function renderOther() {
  screen.innerHTML = `<p class="eyebrow">Stage 4 prototype</p><h1>About this demo</h1><p class="subtitle">A high-fidelity interaction prototype for heuristic evaluation. No account or backend is required.</p><article class="card info-card"><h2>Complete flows</h2><ul class="scope-list"><li>Add a product by barcode or manual entry</li><li>Sort inventory by expiry date</li><li>Discover recipes based on inventory</li><li>Check ingredients before cooking</li><li>Complete the six-step Ratatouille recipe</li><li>Automatic parallel timer and voice controls</li></ul></article><article class="card info-card"><h2>Intentionally limited</h2><ul class="scope-list"><li>Only Ratatouille has a complete cooking flow</li><li>Barcode scanning uses a simulation</li><li>Changes last only until the page is refreshed</li><li>Recipe videos are interaction demonstrations</li></ul></article><button class="danger" id="resetDemo" style="width:100%">Reset prototype</button>`;
  document.querySelector('#resetDemo').onclick=()=>resetState(true);
}

function openModal(html){ modalLayer.innerHTML=`<div class="modal" role="dialog" aria-modal="true">${html}<button class="text-button" id="closeModal" style="width:100%;margin-top:10px">Cancel</button></div>`; document.querySelector('#closeModal').onclick=closeModal; modalLayer.onclick=e=>{if(e.target===modalLayer)closeModal();}; }
function closeModal(){ modalLayer.innerHTML=''; }
function showToast(message){ toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2800); }
function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>go(b.dataset.route));
document.querySelector('.brand').onclick=()=>go('home');
document.querySelector('.avatar').onclick=()=>go('other');
backButton.onclick=goBack;
resetState();
