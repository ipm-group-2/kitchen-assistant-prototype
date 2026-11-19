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
  {
    id: 'ratatouille', name: 'Ratatouille', icon: '🍲', art: 'orange', time: 55,
    difficulty: 'Medium', match: 'You have everything', missing: 0, full: true,
    description: 'A classic Provençal bake made with thinly sliced courgette, aubergine, pepper and ripe tomatoes. The vegetables soften together over a gently cooked onion, garlic and herb base, then finish with olive oil for a rich, fragrant dish. Serve warm as a main course with crusty bread, or as a side alongside grilled fish or chicken.',
    ingredients: [
      { name: 'Courgette', icon: '🥒', quantity: '1 medium', available: true },
      { name: 'Aubergine', icon: '🍆', quantity: '1 medium', available: true },
      { name: 'Tomatoes', icon: '🍅', quantity: '3 medium', available: true },
      { name: 'Red pepper', icon: '🫑', quantity: '1', available: true },
      { name: 'Onion', icon: '🧅', quantity: '1 small', available: true },
      { name: 'Garlic', icon: '🧄', quantity: '2 cloves', available: true },
      { name: 'Fresh herbs', icon: '🌿', quantity: '1 small bunch', available: true },
      { name: 'Olive oil', icon: '🫒', quantity: '2 tbsp', available: true }
    ]
  },
  {
    id: 'spinach-rice', name: 'Spinach rice bowl', icon: '🍛', art: 'green', time: 25,
    difficulty: 'Easy', match: 'You have everything', missing: 0, full: false,
    description: 'A quick, balanced rice bowl with tender spinach folded through fluffy rice, sweet onion and garlic. A squeeze of lemon brightens the greens, while a little olive oil brings the ingredients together. It works as a light lunch on its own or as a simple side for roasted vegetables, fish or chicken.',
    ingredients: [
      { name: 'Spinach', icon: '🥬', quantity: '1 bag', available: true },
      { name: 'Rice', icon: '🍚', quantity: '1 cup', available: true },
      { name: 'Onion', icon: '🧅', quantity: '½ small', available: true },
      { name: 'Garlic', icon: '🧄', quantity: '1 clove', available: true },
      { name: 'Vegetable stock', icon: '🥣', quantity: '250 ml', available: true },
      { name: 'Olive oil', icon: '🫒', quantity: '1 tbsp', available: true },
      { name: 'Lemon', icon: '🍋', quantity: '½', available: true }
    ]
  },
  {
    id: 'omelette', name: 'Garden omelette', icon: '🍳', art: 'yellow', time: 15,
    difficulty: 'Easy', match: 'Missing cheese', missing: 1, full: false,
    description: 'A soft, folded omelette filled with chopped spinach, tomato and onion for a fresh, savoury breakfast or light meal. The eggs are cooked gently so the centre stays tender, then finished with grated cheese for a creamy, golden filling. Serve straight from the pan with toast or a crisp green salad.',
    ingredients: [
      { name: 'Eggs', icon: '🥚', quantity: '3', available: true },
      { name: 'Spinach', icon: '🥬', quantity: '1 handful', available: true },
      { name: 'Tomatoes', icon: '🍅', quantity: '1 small', available: true },
      { name: 'Onion', icon: '🧅', quantity: '¼', available: true },
      { name: 'Cheese', icon: '🧀', quantity: '30 g', available: false },
      { name: 'Olive oil', icon: '🫒', quantity: '1 tsp', available: true }
    ]
  },
  {
    id: 'pasta', name: 'Tomato basil pasta', icon: '🍝', art: 'orange', time: 30,
    difficulty: 'Easy', match: 'Missing basil', missing: 1, full: false,
    description: 'A straightforward pasta supper with a bright sauce of ripe tomatoes, garlic and olive oil. The tomatoes simmer until soft and glossy, coating the pasta without making the dish heavy. Fresh basil adds a sweet, peppery finish, with a little grated cheese and black pepper to serve.',
    ingredients: [
      { name: 'Pasta', icon: '🍝', quantity: '200 g', available: true },
      { name: 'Tomatoes', icon: '🍅', quantity: '3 medium', available: true },
      { name: 'Garlic', icon: '🧄', quantity: '2 cloves', available: true },
      { name: 'Olive oil', icon: '🫒', quantity: '1 tbsp', available: true },
      { name: 'Fresh basil', icon: '🌿', quantity: '1 small bunch', available: false },
      { name: 'Parmesan', icon: '🧀', quantity: 'To serve', available: true }
    ]
  },
  {
    id: 'mushroom-risotto', name: 'Creamy mushroom risotto', icon: '🍄', art: 'green', time: 40,
    difficulty: 'Medium', match: 'Missing 5 ingredients', missing: 5, full: false, catalogOnly: true,
    description: 'A slow-stirred Italian rice dish with earthy mushrooms, softened onion and a savoury stock. Arborio rice releases its starch as it cooks, creating a naturally creamy texture. Finish with butter, Parmesan and black pepper for a warming main course.',
    ingredients: [
      { name: 'Arborio rice', icon: '🍚', quantity: '180 g', available: true },
      { name: 'Mushrooms', icon: '🍄', quantity: '200 g', available: false },
      { name: 'Vegetable stock', icon: '🥣', quantity: '700 ml', available: false },
      { name: 'White wine', icon: '🍷', quantity: '100 ml', available: false },
      { name: 'Parmesan', icon: '🧀', quantity: '40 g', available: false },
      { name: 'Onion', icon: '🧅', quantity: '1 small', available: true },
      { name: 'Butter', icon: '🧈', quantity: '25 g', available: false }
    ]
  },
  {
    id: 'chicken-fajita-bowl', name: 'Chicken fajita bowl', icon: '🥙', art: 'orange', time: 35,
    difficulty: 'Easy', match: 'Missing 5 ingredients', missing: 5, full: false, catalogOnly: true,
    description: 'A colourful bowl inspired by fajitas, with spiced chicken, charred peppers and warm rice. Add black beans for extra substance, then finish with avocado, lime and fresh coriander. The components are served separately so everyone can build their own bowl.',
    ingredients: [
      { name: 'Rice', icon: '🍚', quantity: '1 cup', available: true },
      { name: 'Chicken breast', icon: '🍗', quantity: '2 small', available: false },
      { name: 'Bell peppers', icon: '🫑', quantity: '2', available: false },
      { name: 'Black beans', icon: '🫘', quantity: '1 tin', available: false },
      { name: 'Avocado', icon: '🥑', quantity: '1', available: false },
      { name: 'Lime', icon: '🍋', quantity: '1', available: false },
      { name: 'Onion', icon: '🧅', quantity: '1 small', available: true }
    ]
  },
  {
    id: 'pumpkin-soup', name: 'Roasted pumpkin soup', icon: '🎃', art: 'orange', time: 45,
    difficulty: 'Easy', match: 'Missing 4 ingredients', missing: 4, full: false, catalogOnly: true,
    description: 'A smooth autumn soup made from roasted pumpkin, garlic and onion. Roasting deepens the pumpkin’s sweetness before it is blended with warm stock and a splash of cream. Serve with black pepper, toasted seeds and crusty bread.',
    ingredients: [
      { name: 'Pumpkin', icon: '🎃', quantity: '600 g', available: false },
      { name: 'Cream', icon: '🥛', quantity: '100 ml', available: false },
      { name: 'Vegetable stock', icon: '🥣', quantity: '500 ml', available: false },
      { name: 'Garlic', icon: '🧄', quantity: '2 cloves', available: false },
      { name: 'Onion', icon: '🧅', quantity: '1', available: true },
      { name: 'Olive oil', icon: '🫒', quantity: '1 tbsp', available: true }
    ]
  },
  {
    id: 'chickpea-curry', name: 'Coconut chickpea curry', icon: '🍛', art: 'green', time: 30,
    difficulty: 'Easy', match: 'Missing 4 ingredients', missing: 4, full: false, catalogOnly: true,
    description: 'A comforting one-pot curry with chickpeas simmered in coconut milk, tomatoes and fragrant spices. The sauce becomes rich and gently thick as it cooks. Serve over rice with fresh coriander and a squeeze of lime for brightness.',
    ingredients: [
      { name: 'Chickpeas', icon: '🫘', quantity: '1 tin', available: false },
      { name: 'Coconut milk', icon: '🥥', quantity: '400 ml', available: false },
      { name: 'Curry paste', icon: '🍛', quantity: '2 tbsp', available: false },
      { name: 'Tomatoes', icon: '🍅', quantity: '2 medium', available: true },
      { name: 'Rice', icon: '🍚', quantity: '1 cup', available: true },
      { name: 'Onion', icon: '🧅', quantity: '1', available: true },
      { name: 'Fresh coriander', icon: '🌿', quantity: 'A few sprigs', available: false }
    ]
  },
  {
    id: 'salmon-couscous', name: 'Lemon salmon couscous', icon: '🐟', art: 'yellow', time: 25,
    difficulty: 'Medium', match: 'Missing 4 ingredients', missing: 4, full: false, catalogOnly: true,
    description: 'A light Mediterranean-style plate of flaky salmon with fluffy couscous, cucumber and herbs. Lemon zest and juice bring freshness, while olive oil ties the grains and vegetables together. It is designed as a quick weeknight meal with bright, clean flavours.',
    ingredients: [
      { name: 'Salmon fillet', icon: '🐟', quantity: '2', available: false },
      { name: 'Couscous', icon: '🍚', quantity: '150 g', available: false },
      { name: 'Cucumber', icon: '🥒', quantity: '½', available: false },
      { name: 'Fresh dill', icon: '🌿', quantity: 'A few sprigs', available: false },
      { name: 'Lemon', icon: '🍋', quantity: '1', available: true },
      { name: 'Olive oil', icon: '🫒', quantity: '1 tbsp', available: true }
    ]
  }
];

const cookingGuides = {
  ratatouille: [
    { title: 'Prep the vegetables', icon: '🔪', text: 'Wash the courgette, aubergine, peppers and tomatoes. Trim the ends, then slice everything into even rounds so the vegetables cook at the same pace.' },
    { title: 'Make the tomato base', icon: '🥫', text: 'Finely chop the onion and garlic. Warm olive oil in a pan, soften the onion, then stir in the garlic and chopped tomatoes. Simmer until the sauce thickens slightly.' },
    { title: 'Layer the vegetables', icon: '🥒', text: 'Spread the tomato sauce across the bottom of an ovenproof dish. Arrange the courgette, aubergine, pepper and tomato slices in overlapping rows. Season with salt, pepper and herbs.' },
    { title: 'Bake until tender', icon: '⏱️', text: 'Cover the dish loosely with foil and place it in a preheated oven at 190°C. Press START to time 25 minutes. The vegetables should become tender without losing their shape.', timer: 25, timerLabel: 'Ratatouille bake' },
    { title: 'Prepare the herb oil', icon: '🌿', text: 'While the vegetables bake, finely chop the fresh herbs. Mix them with olive oil, a pinch of salt and a little black pepper.' },
    { title: 'Finish and serve', icon: '🍲', text: 'Check that the vegetables are tender. Spoon the herb oil over the top and let the dish rest briefly. Serve warm with crusty bread or as a side.' }
  ],
  'spinach-rice': [
    { title: 'Rinse and prepare', icon: '🍚', text: 'Rinse the rice under cold water until the water looks mostly clear. Finely chop the onion and garlic, wash the spinach, and measure out the vegetable stock.' },
    { title: 'Cook the rice', icon: '⏱️', text: 'Put the rinsed rice and vegetable stock in a saucepan. Bring to a gentle boil, cover, then reduce the heat to low. Press START and simmer for 12 minutes, or until the rice is tender.', timer: 12, timerLabel: 'Rice cooking' },
    { title: 'Soften the aromatics', icon: '🧅', text: 'While the rice cooks, warm olive oil in a wide pan. Add the chopped onion and cook until soft, then stir in the garlic for about 30 seconds.' },
    { title: 'Wilt the spinach', icon: '🥬', text: 'Add the spinach to the pan in handfuls. Toss gently until each handful wilts. Season with a little salt and black pepper.' },
    { title: 'Bring everything together', icon: '🥣', text: 'Fluff the cooked rice with a fork and fold it into the spinach mixture. Add a splash of stock if it looks dry, then squeeze in the lemon juice.' },
    { title: 'Bowl and serve', icon: '🍋', text: 'Taste and adjust the seasoning. Divide the spinach rice between bowls and finish with a little olive oil and lemon zest if available.' }
  ],
  omelette: [
    { title: 'Prepare the filling', icon: '🔪', text: 'Finely chop the onion and tomato. Roughly chop the spinach and grate the cheese. Keep the filling ingredients close to the hob.' },
    { title: 'Whisk the eggs', icon: '🥚', text: 'Crack the eggs into a bowl. Add a pinch of salt and black pepper, then whisk until the yolks and whites are evenly combined.' },
    { title: 'Cook the vegetables', icon: '🧅', text: 'Warm a little olive oil in a non-stick frying pan over medium heat. Soften the onion, add the tomato, then stir through the spinach until just wilted. Transfer the filling to a plate.' },
    { title: 'Set the omelette', icon: '🍳', text: 'Lower the heat and add a little more oil if the pan is dry. Pour in the eggs and gently draw the cooked edges toward the centre, tilting the pan so uncooked egg fills the gaps. Cook until softly set.' },
    { title: 'Add cheese and fold', icon: '🧀', text: 'Scatter the vegetable filling and grated cheese over one half of the omelette. Fold the other half over the filling and cook briefly until the cheese begins to melt.' },
    { title: 'Serve while warm', icon: '🍽️', text: 'Slide the omelette onto a plate. Let it settle for a few seconds, then serve immediately with toast or a fresh salad.' }
  ],
  pasta: [
    { title: 'Prepare the ingredients', icon: '🔪', text: 'Finely chop the garlic and tomatoes. Pick the basil leaves and keep a few aside for garnish. Grate the Parmesan and place a large pot of salted water on the hob.' },
    { title: 'Boil the pasta', icon: '⏱️', text: 'Bring the salted water to a rolling boil. Add the pasta, stir once to prevent sticking, then press START for the packet cooking time (about 9 minutes). Reserve a cup of pasta water before draining.', timer: 9, timerLabel: 'Pasta cooking' },
    { title: 'Start the tomato sauce', icon: '🍅', text: 'While the pasta cooks, warm olive oil in a large pan over medium-low heat. Add the garlic and stir for 30 seconds, taking care not to let it brown.' },
    { title: 'Simmer the tomatoes', icon: '🥫', text: 'Add the chopped tomatoes, season with salt and black pepper, and let them soften into a glossy sauce. Add a splash of pasta water if the pan becomes too dry.' },
    { title: 'Combine with basil', icon: '🌿', text: 'Drain the pasta, reserving a little cooking water. Add the pasta to the sauce and toss until coated. Tear in most of the basil and loosen with pasta water as needed.' },
    { title: 'Finish and plate', icon: '🍝', text: 'Divide the pasta between warm bowls. Finish with Parmesan, the remaining basil and a drizzle of olive oil. Serve straight away.' }
  ]
};

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
let timerStatus = 'idle';
let timerStepIndex = null;
let voiceEnabled = false;
let voiceRecognition = null;
let voiceRestartTimeout = null;

function resetState(showMessage = false) {
  state = {
    products: structuredClone(initialProducts),
    shopping: [
      { name: 'Milk', qty: '1 litre' },
      { name: 'Cheese', qty: '200 g' },
      { name: 'Basil', qty: '1 bunch' }
    ],
    recipeSubstitutions: {}
  };
  stopVoiceControl();
  stopTimer();
  route = 'home'; history = []; activeRecipe = null; cookStep = 0;
  render();
  if (showMessage) showToast('Prototype reset and ready to use.');
}

function go(next, push = true) {
  if (route === 'cooking' && next !== 'cooking') {
    stopVoiceControl();
    if (timerStatus === 'running') pauseTimer(false);
  }
  if (push && route !== next) history.push(route);
  route = next;
  modalLayer.innerHTML = '';
  screen.scrollTop = 0;
  render();
}

function goBack() {
  if (route === 'cooking' || route === 'missing-ingredients') { go('recipe-detail', false); return; }
  go(history.pop() || 'home', false);
}

function render() {
  screen.classList.toggle('cooking-mode', route === 'cooking');
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === route));
  backButton.classList.toggle('is-hidden', ['home','recipes','inventory','shopping','other'].includes(route));
  document.querySelector('.bottom-nav').style.display = route === 'cooking' ? 'none' : 'grid';
  const renderers = { home: renderHome, inventory: renderInventory, recipes: renderRecipes, 'recipe-detail': renderRecipeDetail, 'missing-ingredients': renderMissingIngredients, cooking: renderCooking, shopping: renderShopping, other: renderOther };
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
      <button class="quick-action" data-route="inventory"><span class="fridge-icon" aria-hidden="true"><i></i></span>Add product</button>
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
    </div>
    <div class="home-ratchef-note">
      <img src="RatChef_Mascot.png" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
      <span class="home-ratchef-fallback" hidden aria-hidden="true">🐀👨‍🍳</span>
      <p>“I can't wait to get started!”</p>
    </div>`;
  document.querySelector('.recipe-feature').onclick = () => openRecipe('ratatouille');
  document.querySelector('#expiryShortcut').onclick = () => { inventoryFilter = 'Expiring'; go('inventory'); };
  document.querySelector('#homeSearch').onkeydown = e => { if (e.key === 'Enter') { recipeQuery = e.target.value; go('recipes'); } };
}

function featureRecipe(r) {
  return `<article class="card recipe-feature" tabindex="0" role="button" aria-label="Open ${r.name}">
    <div class="food-art ${r.art}"><span>${r.icon}</span></div>
    <div class="recipe-copy"><h3>${r.name}</h3><div class="meta-row"><span class="recipe-meta-pill recipe-time-pill">◷ ${r.time} min</span><span class="recipe-meta-pill difficulty-${String(r.difficulty).toLowerCase()}">◇ ${r.difficulty}</span></div><span class="status-chip">✓ ${r.match}</span></div>
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
    <h1>Inventory</h1><p class="subtitle">Track what you have and use it before it expires.</p>
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
  document.querySelectorAll('[data-product-menu]').forEach(button => {
    button.onclick = () => openProductMenu(Number(button.dataset.productMenu));
  });
  document.querySelector('#addProduct').onclick = openAddMethod;
}

function productCard(p) {
  return `<article class="card product-card"><div class="product-icon">${p.icon}</div><div><h3>${p.name}</h3><p>${p.qty}</p><p class="expiry ${p.days <= 3 ? 'soon':''}">${p.days <= 1 ? 'Expires tomorrow' : `Expires in ${p.days} days`}</p></div><button class="kebab" data-product-menu="${p.id}" aria-label="More options for ${p.name}">⋮</button></article>`;
}

function openProductMenu(id) {
  const product = state.products.find(item => item.id === id);
  if (!product) return;
  openModal(`<div class="modal-handle"></div><p class="eyebrow">Inventory item</p><h2>${product.icon} ${escapeHtml(product.name)}</h2><p class="subtitle">${escapeHtml(product.qty)} · ${product.days <= 1 ? 'Expires tomorrow' : `Expires in ${product.days} days`}</p><button class="danger" id="removeProduct" style="width:100%">Remove from inventory</button>`);
  document.querySelector('#removeProduct').onclick = () => confirmProductRemoval(product);
}

function confirmProductRemoval(product) {
  openModal(`<div class="modal-handle"></div><p class="eyebrow">Remove product</p><h2>Remove ${escapeHtml(product.name)}?</h2><p class="subtitle">This item will no longer appear in your inventory.</p><button class="danger" id="confirmRemoveProduct" style="width:100%">Yes, remove product</button>`);
  document.querySelector('#confirmRemoveProduct').onclick = () => {
    state.products = state.products.filter(item => item.id !== product.id);
    closeModal();
    renderInventory();
    showToast(`${product.name} removed from your inventory.`);
  };
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
  if (recipeFilter === 'I have everything') list = list.filter(r => getMissingIngredients(r).length === 0);
  screen.innerHTML = `
    <h1>Find a recipe</h1><p class="subtitle">Suggestions use your inventory and prioritise ingredients close to expiry.</p>
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
  const missingCount = getMissingIngredients(r).length;
  const catalogOnly = Boolean(r.catalogOnly);
  const availabilityLabel = missingCount ? `${missingCount} missing · ${catalogOnly ? 'more ingredients needed' : 'review ingredients'}` : 'You have everything';
  return `<article class="card recipe-card ${catalogOnly ? 'is-locked' : ''}" data-recipe="${r.id}" tabindex="0" role="button" aria-label="View ${escapeHtml(r.name)} recipe details${catalogOnly ? ', cooking guide coming soon' : ''}">
    <div class="food-art ${r.art}"><span>${r.icon}</span></div>
    <div class="recipe-copy"><h3>${escapeHtml(r.name)}</h3>
      <div class="meta-row"><span class="recipe-meta-pill recipe-time-pill">◷ ${r.time} min</span><span class="recipe-meta-pill difficulty-${String(r.difficulty).toLowerCase()}">◇ ${escapeHtml(r.difficulty)}</span></div>
      <span class="status-chip ${missingCount ? 'missing' : ''}">${missingCount ? '!' : '✓'} ${availabilityLabel}</span>
      ${catalogOnly ? '<span class="catalog-coming-soon">Preview available · guide coming soon</span>' : ''}
    </div>
  </article>`;
}

function getMissingIngredients(recipe) {
  return (recipe.ingredients || []).filter(item => !item.available);
}

function openRecipe(id) { activeRecipe = recipes.find(r => r.id === id); if (activeRecipe) go('recipe-detail'); }

function renderRecipeDetail() {
  const r = activeRecipe || recipes[0];
  activeRecipe = r;
  const ingredients = r.ingredients || [];
  const missingIngredients = getMissingIngredients(r);
  const missingCount = missingIngredients.length;
  const hasMissing = missingCount > 0;
  const hasGuide = Boolean(cookingGuides[r.id]);
  const difficultyClass = `difficulty-${String(r.difficulty).toLowerCase()}`;

  screen.innerHTML = `
    <div class="hero-card">
      <div class="food-art ${r.art}"><span>${r.icon}</span></div>
    </div>
    <div class="detail-body">
      <p class="eyebrow">Recipe preview</p>
      <h1>${escapeHtml(r.name)}</h1>
      <div class="recipe-description" tabindex="0" aria-label="Recipe description">
        ${escapeHtml(r.description)}
      </div>
      <div class="meta-row recipe-meta-row" aria-label="Recipe details">
        <span class="recipe-meta-pill recipe-time-pill">◷ ${r.time} min</span>
        <span class="recipe-meta-pill ${difficultyClass}">◇ ${escapeHtml(r.difficulty)} difficulty</span>
        <span class="recipe-meta-pill recipe-servings-pill">♙ 2 servings</span>
      </div>
      <div class="availability-banner ${hasMissing ? 'is-missing' : 'is-available'}" role="status">
        ${hasMissing
          ? `! You are missing ${missingCount} ${missingCount === 1 ? 'ingredient' : 'ingredients'}. Review ${missingCount === 1 ? 'it' : 'them'} below before cooking.`
          : '✓ You have every required ingredient in your inventory.'}
      </div>
      <div class="section-heading">
        <h2>Ingredients</h2>
        <span class="status-chip ${hasMissing ? 'missing' : ''}">${hasMissing ? `${missingCount} missing` : 'All available'}</span>
      </div>
      <div class="ingredient-list" role="list" aria-label="Recipe ingredients">
        ${ingredients.map(item => `
          <div class="ingredient-row ${item.available ? 'is-available' : 'is-missing'}" role="listitem">
            <span class="ingredient-icon" aria-hidden="true">${item.icon}</span>
            <span class="ingredient-name">${escapeHtml(item.name)}</span>
            <strong class="ingredient-quantity">${escapeHtml(item.quantity)}</strong>
            <span class="ingredient-state ${item.available ? 'available' : 'missing'}" aria-label="${item.available ? 'Available' : 'Missing'}">${item.available ? '✓' : '!'}</span>
          </div>`).join('')}
      </div>
      <div class="detail-actions">
        <button class="secondary" id="shoppingFromRecipe">${hasMissing ? 'Add missing item to shopping list' : 'Save recipe'}</button>
        ${hasGuide
          ? '<button class="primary" id="startCooking">Start cooking →</button>'
          : '<button class="primary" id="startCooking" disabled>Guide coming soon</button>'}
      </div>
      <p class="guide-availability-note">${hasGuide ? 'A guided cooking sequence is available for this recipe.' : 'You can explore the full recipe and ingredient list. Its guided cooking sequence is coming soon.'}</p>
    </div>`;

  document.querySelector('#shoppingFromRecipe').onclick = () => {
    if (hasMissing) {
      missingIngredients.forEach(item => {
        if (!state.shopping.some(entry => entry.name.toLowerCase() === item.name.toLowerCase() && !entry.done)) {
          state.shopping.unshift({ name: item.name, qty: item.quantity });
        }
      });
      showToast(`Added ${missingCount} missing ${missingCount === 1 ? 'ingredient' : 'ingredients'} to the shopping list.`);
    } else {
      showToast('Recipe saved for this demo session.');
    }
  };

  document.querySelector('#startCooking').onclick = () => {
    if (!hasGuide) return;
    activeRecipe = r;
    if (hasMissing) {
      go('missing-ingredients', false);
      return;
    }
    beginCooking();
  };
}

const substituteOptions = {
  cheese: ['Parmesan', 'Feta', 'Nutritional yeast'],
  'fresh basil': ['Fresh parsley', 'Fresh oregano', 'Baby spinach']
};

function getSubstituteOptions(ingredient) {
  return substituteOptions[ingredient.name.toLowerCase()] || ['Parmesan', 'Fresh parsley', 'Baby spinach'];
}

function renderMissingIngredients() {
  const recipe = activeRecipe || recipes[0];
  const missing = getMissingIngredients(recipe);
  screen.innerHTML = `
    <div class="missing-ingredients-screen">
      <p class="eyebrow">Before you start cooking</p>
      <h1>One more check</h1>
      <p class="subtitle">${escapeHtml(recipe.name)} is missing ${missing.length} ${missing.length === 1 ? 'ingredient' : 'ingredients'}. Choose how you'd like to continue.</p>
      <div class="missing-screen-list">
        ${missing.map((item, index) => `
          <div class="missing-screen-row">
            <span class="ingredient-icon" aria-hidden="true">${item.icon}</span>
            <div class="missing-screen-item-copy"><strong>${escapeHtml(item.name)}</strong><small>Needed: ${escapeHtml(item.quantity)}</small></div>
            <span class="missing-screen-badge">Missing</span>
            <label class="substitute-field" for="substitute-${index}">
              <span>Replace with</span>
              <select id="substitute-${index}" data-substitute-index="${index}">
                <option value="">Choose a substitute…</option>
                ${getSubstituteOptions(item).map(option => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join('')}
              </select>
            </label>
          </div>`).join('')}
      </div>
      <p class="substitute-help">Substitutions are recorded for this demo. RatChef's guided steps stay the same.</p>
      <div class="missing-screen-actions">
        <button class="secondary" id="cancelMissing">Cancel</button>
        <button class="secondary" id="cookWithout">Cook without</button>
        <button class="primary" id="replaceAndCook">Replace &amp; cook</button>
      </div>
    </div>`;

  document.querySelector('#cancelMissing').onclick = () => go('recipe-detail', false);
  document.querySelector('#cookWithout').onclick = beginCooking;
  document.querySelector('#replaceAndCook').onclick = () => {
    const selections = {};
    let incomplete = false;
    missing.forEach((item, index) => {
      const select = document.querySelector(`#substitute-${index}`);
      const choice = select ? select.value : '';
      if (!choice) incomplete = true;
      else selections[item.name] = choice;
    });
    if (incomplete) {
      showToast('Choose a substitute for each missing ingredient, or use Cook without.');
      return;
    }
    state.recipeSubstitutions[recipe.id] = selections;
    const summary = Object.entries(selections).map(([from, to]) => `${to} for ${from}`).join(', ');
    showToast(`Using ${summary}. RatChef's guide will stay the same.`);
    beginCooking();
  };
}

function beginCooking() {
  cookStep = 0;
  stopTimer();
  stopVoiceControl();
  go('cooking', false);
}

function getActiveCookingSteps() {
  const recipe = activeRecipe || recipes[0];
  return cookingGuides[recipe.id] || cookingGuides.ratatouille;
}

function prepareCurrentStepTimer(step) {
  if (step && step.timer) {
    if (timerStepIndex !== cookStep) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStepIndex = cookStep;
      timerSeconds = step.timer * 60;
      timerStatus = 'idle';
    }
  }
}

function timerControlsMarkup() {
  if (timerStatus === 'done' || timerStatus === 'skipped') {
    return `<span class="timer-finished-label">${timerStatus === 'done' ? 'Timer complete' : 'Timer skipped'}</span>`;
  }
  const primary = timerStatus === 'idle'
    ? '<button class="timer-action timer-start" id="startTimer">START</button>'
    : timerStatus === 'running'
      ? '<button class="timer-action timer-pause" id="pauseTimer">PAUSE</button>'
      : '<button class="timer-action timer-start" id="resumeTimer">RESUME</button>';
  return `${primary}<button class="timer-action timer-skip" id="skipTimer">SKIP</button>`;
}

function microphoneIconMarkup(isMuted) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="9" y="2" width="6" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>${isMuted ? '<path d="M3 3 21 21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' : ''}</svg>`;
}

function renderCooking() {
  clearTimeout(window.videoDemoTimer);
  const recipe = activeRecipe || recipes[0];
  activeRecipe = recipe;
  const steps = getActiveCookingSteps();
  if (cookStep >= steps.length) {
    renderCompletion();
    return;
  }

  const step = steps[cookStep];
  prepareCurrentStepTimer(step);
  const timerStep = timerStepIndex !== null ? steps[timerStepIndex] : null;
  const pct = ((cookStep + 1) / steps.length) * 100;
  const voiceLabel = voiceEnabled ? 'Turn voice commands off' : 'Turn voice commands on';

  screen.innerHTML = `
    <div class="cook-screen">
      <header class="cook-top">
        <div class="cook-heading-line">
          <span class="eyebrow">GUIDED COOKING · ${escapeHtml(recipe.name)}</span>
          <span class="cook-step-counter">STEP ${cookStep + 1} / ${steps.length}</span>
        </div>
        <div class="progress-track" aria-label="Cooking progress">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      </header>

      <section class="cook-video-placeholder" aria-label="Step video demonstration">
        <div class="cook-video-frame">
          <span class="cook-video-scene" aria-hidden="true">${step.icon || '🍳'}</span>
          <span class="cook-video-tag">STEP VIDEO DEMONSTRATION</span>
          <button class="play-button" id="playDemo" type="button" aria-label="Play ${escapeHtml(step.title)} video demonstration" aria-pressed="false">▶</button>
          <span class="cook-video-duration">1:20</span>
        </div>
        <div class="cook-video-copy">
          <span>WATCH THE TECHNIQUE</span>
          <strong>${escapeHtml(step.media || `${step.title} demonstration`)}</strong>
        </div>
      </section>

      <main class="cook-main">
        <div class="cook-rat-wrap">
          <img class="cook-rat-logo" src="RatChef_Mascot.png" alt="RatChef, your cooking guide" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <span class="cook-rat-fallback" hidden aria-hidden="true">🐀👨‍🍳</span>
          <span class="cook-rat-caption">RatChef</span>
        </div>

        <div class="cook-instructions">
          <section class="cook-speech-bubble" aria-live="polite">
            <p class="cook-speaker-label">RatChef says</p>
            <h1>${escapeHtml(step.title)}</h1>
            <p class="cook-step-description">${escapeHtml(step.text)}</p>
          </section>
          ${timerStep ? `
            <section class="cook-timer-panel" aria-label="Step timer">
              <div class="timer-panel-heading">
                <span class="timer-panel-icon">⏱</span>
                <span>${escapeHtml(timerStep.timerLabel || 'Step timer')}</span>
                <strong class="timer-status-text" id="timerStatusText">${timerStatus === 'idle' ? 'READY' : timerStatus === 'running' ? 'RUNNING' : timerStatus === 'paused' ? 'PAUSED' : timerStatus === 'done' ? 'COMPLETE' : 'SKIPPED'}</strong>
              </div>
              <div class="timer-panel-bottom">
                <strong class="timer-clock" id="largeTimer">${formatTime(timerSeconds)}</strong>
                <div class="timer-actions">${timerControlsMarkup()}</div>
              </div>
            </section>` : ''}
        </div>
      </main>

      <footer class="cook-bottom">
        <div class="cook-controls">
          <button class="secondary cook-control-button" id="previousStep" ${cookStep === 0 ? 'disabled' : ''}>← Previous</button>
          <button class="secondary cook-control-button" id="repeatStep">↻ Repeat</button>
          <div class="next-step-stack">
            <button class="mic-toggle ${voiceEnabled ? 'is-on' : ''}" id="voiceControl" type="button" aria-label="${voiceLabel}" aria-pressed="${voiceEnabled}" title="${voiceLabel}">${microphoneIconMarkup(!voiceEnabled)}</button>
            <button class="primary cook-next-button" id="nextStep">${cookStep === steps.length - 1 ? 'Finish →' : 'Next →'}</button>
          </div>
        </div>
        ${voiceEnabled ? '<p class="voice-status-note">Voice commands on · say “next”, “previous”, “repeat”, “start”, “pause” or “skip”</p>' : ''}
      </footer>
    </div>`;

  document.querySelector('#previousStep').onclick = () => {
    if (cookStep > 0) {
      cookStep--;
      renderCooking();
    }
  };
  document.querySelector('#nextStep').onclick = () => {
    cookStep++;
    renderCooking();
  };
  document.querySelector('#repeatStep').onclick = () => showToast(`RatChef says: ${step.text}`);
  document.querySelector('#voiceControl').onclick = toggleVoiceControl;
  document.querySelector('#playDemo').onclick = event => {
    const button = event.currentTarget;
    const isPlaying = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!isPlaying));
    button.textContent = isPlaying ? '▶' : 'Ⅱ';
    button.setAttribute('aria-label', isPlaying ? 'Play video demonstration' : 'Pause video demonstration');
    button.closest('.cook-video-frame').classList.toggle('is-playing', !isPlaying);
    showToast(isPlaying ? 'Video demonstration paused.' : 'Video demonstration playing (placeholder).');
    if (!isPlaying) {
      clearTimeout(window.videoDemoTimer);
      window.videoDemoTimer = setTimeout(() => {
        const currentButton = document.querySelector('#playDemo');
        if (currentButton && currentButton.getAttribute('aria-pressed') === 'true') {
          currentButton.setAttribute('aria-pressed', 'false');
          currentButton.textContent = '▶';
          currentButton.setAttribute('aria-label', 'Play video demonstration');
          currentButton.closest('.cook-video-frame')?.classList.remove('is-playing');
        }
      }, 2200);
    }
  };

  const startButton = document.querySelector('#startTimer');
  const pauseButton = document.querySelector('#pauseTimer');
  const resumeButton = document.querySelector('#resumeTimer');
  const skipButton = document.querySelector('#skipTimer');
  if (startButton) startButton.onclick = startCurrentTimer;
  if (pauseButton) pauseButton.onclick = () => { pauseTimer(); };
  if (resumeButton) resumeButton.onclick = startCurrentTimer;
  if (skipButton) skipButton.onclick = skipCurrentTimer;
}
function renderCompletion() {
  const recipe = activeRecipe || recipes[0];
  stopVoiceControl();
  stopTimer();
  screen.innerHTML = `
    <div class="cook-screen cook-completion-screen">
      <div class="completion-card">
        <div class="completion-rat">🎉</div>
        <p class="eyebrow">RECIPE COMPLETE</p>
        <h1>${escapeHtml(recipe.name)} is ready.</h1>
        <p class="subtitle">RatChef says: Nicely done. Your dish is ready to serve.</p>
        <button class="primary" id="finishRecipe">Done — return home</button>
      </div>
    </div>`;
  document.querySelector('#finishRecipe').onclick = () => {
    stopTimer();
    go('home');
    showToast('Bon appétit!');
  };
}

function toggleVoiceControl() {
  if (voiceEnabled) {
    stopVoiceControl();
    renderCooking();
    showToast('Voice commands turned off.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  voiceEnabled = true;
  renderCooking();

  if (!SpeechRecognition) {
    voiceEnabled = false;
    renderCooking();
    showToast('Live speech recognition is not supported here. Use the demo command picker.');
    showVoiceChoices();
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    voiceRecognition = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) handleVoice(event.results[i][0].transcript.toLowerCase());
      }
    };
    recognition.onerror = event => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        stopVoiceControl();
        renderCooking();
        showToast('Microphone permission was denied.');
      }
    };
    recognition.onend = () => {
      if (voiceEnabled && route === 'cooking' && voiceRecognition === recognition) {
        clearTimeout(voiceRestartTimeout);
        voiceRestartTimeout = setTimeout(() => {
          if (voiceEnabled && route === 'cooking' && voiceRecognition === recognition) {
            try { recognition.start(); } catch (_) { /* The browser may still be closing the previous session. */ }
          }
        }, 300);
      }
    };
    recognition.start();
    showToast('Voice commands turned on.');
  } catch (error) {
    stopVoiceControl();
    renderCooking();
    showToast('Could not start the microphone. Check browser permissions.');
  }
}

function stopVoiceControl() {
  voiceEnabled = false;
  clearTimeout(voiceRestartTimeout);
  voiceRestartTimeout = null;
  if (voiceRecognition) {
    const recognition = voiceRecognition;
    voiceRecognition = null;
    recognition.onend = null;
    try { recognition.stop(); } catch (_) { /* Recognition may already have stopped. */ }
  }
}

function showVoiceChoices() {
  const choices = ['Next', 'Previous', 'Repeat', 'Start timer', 'Pause timer', 'Skip timer'];
  openModal(`
    <div class="modal-handle"></div>
    <p class="eyebrow">VOICE COMMAND DEMO</p>
    <h2>Choose a command</h2>
    <p class="subtitle">This browser does not expose live speech recognition, so select a sample command to test the interaction.</p>
    <div class="form-grid">${choices.map(x => `<button class="secondary voice-choice" data-command="${x.toLowerCase()}">“${x}”</button>`).join('')}</div>`);
  document.querySelectorAll('.voice-choice').forEach(button => {
    button.onclick = () => {
      closeModal();
      handleVoice(button.dataset.command);
    };
  });
}

function handleVoice(command) {
  const steps = getActiveCookingSteps();
  const normalised = command.toLowerCase();
  if (normalised.includes('next')) {
    cookStep++;
    renderCooking();
    showToast('Voice command recognised: Next');
  } else if (normalised.includes('previous') || normalised.includes('back')) {
    cookStep = Math.max(0, cookStep - 1);
    renderCooking();
    showToast('Voice command recognised: Previous');
  } else if (normalised.includes('repeat')) {
    const step = steps[cookStep];
    if (step) showToast(`RatChef says: ${step.text}`);
  } else if (normalised.includes('start') || normalised.includes('resume')) {
    startCurrentTimer();
  } else if (normalised.includes('pause')) {
    pauseTimer();
  } else if (normalised.includes('skip')) {
    skipCurrentTimer();
  } else {
    showToast('Command not recognised. Try next, previous, repeat, start, pause or skip.');
  }
}

function startCurrentTimer() {
  const steps = getActiveCookingSteps();
  if (timerStepIndex === null) {
    const currentStep = steps[cookStep];
    if (!currentStep || !currentStep.timer) return;
    prepareCurrentStepTimer(currentStep);
  }
  const step = steps[timerStepIndex];
  if (!step || !step.timer || timerStatus === 'done' || timerStatus === 'skipped' || timerStatus === 'running') return;
  if (timerSeconds <= 0) timerSeconds = step.timer * 60;
  timerStatus = 'running';
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    if (timerSeconds === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStatus = 'done';
      updateTimers();
      renderCooking();
      showToast('⏱ Timer complete.');
    } else {
      updateTimers();
    }
  }, 1000);
  renderCooking();
}

function pauseTimer(shouldRender = true) {
  if (timerStatus !== 'running') return;
  clearInterval(timerInterval);
  timerInterval = null;
  timerStatus = 'paused';
  if (shouldRender && route === 'cooking') renderCooking();
}

function skipCurrentTimer() {
  if (timerStatus === 'done' || timerStatus === 'skipped' || timerStepIndex === null) return;
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  timerStatus = 'skipped';
  renderCooking();
  showToast('Timer skipped. Select Next when ready.');
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  timerStatus = 'idle';
  timerStepIndex = null;
}

function updateTimers() {
  const clock = document.querySelector('#largeTimer');
  if (clock) clock.textContent = formatTime(timerSeconds);
  const status = document.querySelector('#timerStatusText');
  if (status) status.textContent = timerStatus === 'idle' ? 'READY' : timerStatus === 'running' ? 'RUNNING' : timerStatus === 'paused' ? 'PAUSED' : timerStatus === 'done' ? 'COMPLETE' : 'SKIPPED';
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function renderShopping() {
  screen.innerHTML = `
    <p class="eyebrow">Supporting feature</p>
    <h1>Shopping list</h1>
    <p class="subtitle">Adjust quantities as you shop, or remove an item when you no longer need it.</p>
    <div class="shopping-list-card">
      ${state.shopping.length ? state.shopping.map((item, index) => {
        const adjustable = parseShoppingQuantity(item.qty) !== null;
        return `<div class="shopping-list-row">
          <div class="shopping-item-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.qty)}</small></div>
          <div class="shopping-quantity-controls" aria-label="Adjust ${escapeHtml(item.name)} quantity">
            <button type="button" data-quantity-change="-1" data-shopping-index="${index}" aria-label="Decrease ${escapeHtml(item.name)} quantity" ${adjustable ? '' : 'disabled'}>−</button>
            <button type="button" data-quantity-change="1" data-shopping-index="${index}" aria-label="Increase ${escapeHtml(item.name)} quantity" ${adjustable ? '' : 'disabled'}>+</button>
          </div>
          <button class="shopping-remove-button" type="button" data-remove-shopping="${index}" aria-label="Remove ${escapeHtml(item.name)} from shopping list">×</button>
        </div>`;
      }).join('') : '<div class="shopping-empty">Your shopping list is empty.</div>'}
    </div>
    <button class="secondary" id="addShopping" style="width:100%;margin-top:14px">+ Add another item</button>`;

  document.querySelectorAll('[data-quantity-change]').forEach(button => {
    button.onclick = () => adjustShoppingQuantity(Number(button.dataset.shoppingIndex), Number(button.dataset.quantityChange));
  });
  document.querySelectorAll('[data-remove-shopping]').forEach(button => {
    button.onclick = () => {
      const index = Number(button.dataset.removeShopping);
      const removed = state.shopping[index];
      if (!removed) return;
      state.shopping.splice(index, 1);
      renderShopping();
      showToast(`${removed.name} removed from the shopping list.`);
    };
  });
  document.querySelector('#addShopping').onclick=()=>showToast('Manual shopping entry is not available in this prototype.');
}

function parseShoppingQuantity(value) {
  const match = String(value).trim().match(/^(\d+(?:\.\d+)?|½|¼|¾)\s*(.*)$/);
  if (!match) return null;
  const amount = match[1] === '½' ? 0.5 : match[1] === '¼' ? 0.25 : match[1] === '¾' ? 0.75 : Number(match[1]);
  return { amount, unit: match[2] };
}

function adjustShoppingQuantity(index, delta) {
  const item = state.shopping[index];
  if (!item) return;
  const parsed = parseShoppingQuantity(item.qty);
  if (!parsed) return;
  const nextAmount = Math.max(1, Math.round((parsed.amount + delta) * 100) / 100);
  const amountText = Number.isInteger(nextAmount) ? String(nextAmount) : String(nextAmount).replace(/0+$/, '').replace(/\.$/, '');
  item.qty = `${amountText}${parsed.unit ? ` ${parsed.unit}` : ''}`;
  renderShopping();
}

function renderOther() {
  screen.innerHTML = `<p class="eyebrow">Stage 4 prototype</p><h1>About this demo</h1><p class="subtitle">An interaction prototype for Sous-Chef Ratchet. No account or backend is required.</p><article class="card info-card"><h2>Complete flows</h2><ul class="scope-list"><li>Add a product by barcode or manual entry</li><li>Sort inventory with filters</li><li>Discover recipes based on inventory and time required</li><li>Review missing ingredients and choose how to proceed</li><li>Follow guided cooking sequences for supported recipes</li><li>Manual start, pause and skip timers during cooking guides</li><li>Adjust shopping quantities or remove list items</li></ul></article><article class="card info-card"><h2>Intentionally limited</h2><ul class="scope-list"><li>Video demonstrations are just placeholders, not recorded videos</li><li>Some catalogue recipes (those with too many missing ingredients) have no cooking guide</li><li>Barcode scanning uses a simulation</li><li>This "Other" tab mentions only these limitations, but is meant to be where most app settings are in a real scenario</li></ul></article><button class="danger" id="resetDemo" style="width:100%">Reset prototype</button>`;
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
