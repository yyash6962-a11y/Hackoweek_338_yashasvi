// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const cartBadge = document.getElementById('cartBadge');

// Sidebar filters
const categoryRadios = document.querySelectorAll('input[name="category"]');
const ratingRadios = document.querySelectorAll('input[name="rating"]');

// Mobile sidebar logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebarOverlay.style.display = 'block';
});
sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.style.display = 'none';
});

// State
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 12;
let cartCount = 0;

// Initialize
lucide.createIcons();
fetchProducts();

async function fetchProducts() {
  productGrid.innerHTML = createSkeletons(8);
  
  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error("JSON not found");
    const data = await response.json();
    
    allProducts = data;
    applyFilters();
  } catch (error) {
    productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">Error loading products. Ensure products.json exists.</div>';
    console.error(error);
  }
}

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const maxPrice = Number(priceRange.value);
  
  // Get active category radio
  let selectedCategory = 'All';
  categoryRadios.forEach(radio => { if(radio.checked) selectedCategory = radio.value; });
  
  // Get active rating radio
  let minRating = 0;
  ratingRadios.forEach(radio => { if(radio.checked) minRating = Number(radio.value); });
  
  // Filter array
  filteredProducts = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm) || p.brand.toLowerCase().includes(searchTerm);
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchPrice = p.price <= maxPrice;
    const matchRating = p.rating >= minRating;
    
    return matchSearch && matchCategory && matchPrice && matchRating;
  });

  // Apply sorting
  const sortValue = sortSelect.value;
  if(sortValue === 'price-low') {
    filteredProducts.sort((a,b) => a.price - b.price);
  } else if (sortValue === 'price-high') {
    filteredProducts.sort((a,b) => b.price - a.price);
  } else if (sortValue === 'rating') {
    filteredProducts.sort((a,b) => b.rating - a.rating);
  } else {
    // Relevance / Default (sort by ID logically just to stabilize)
    filteredProducts.sort((a,b) => a.id - b.id);
  }

  // Reset pagination state
  currentPage = 1;
  productGrid.innerHTML = ''; // clear grid
  
  resultCount.innerText = `Showing results for ${filteredProducts.length} items`;
  
  renderProducts();
}

function renderProducts() {
  // calculate slice
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageItems = filteredProducts.slice(startIndex, endIndex);
  
  if (pageItems.length === 0 && currentPage === 1) {
    productGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>No products found.</h3><p>Try adjusting filters.</p></div>';
    loadMoreContainer.style.display = 'none';
    return;
  }

  pageItems.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Format price
    const formattedPrice = new Intl.NumberFormat('en-IN').format(product.price);
    
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="card-content">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name" title="${product.name}">${product.name}</h3>
        <div class="rating-row">
          <i data-lucide="star" class="filled"></i>
          <span>${product.rating.toFixed(1)}</span>
          <span class="rating-text">/ 5.0</span>
        </div>
        <div class="card-footer">
          <span class="product-price">₹${formattedPrice}</span>
          <button class="add-btn cart-add" title="Add to Cart">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
  
  // Re-run lucide for newly added dom elements
  lucide.createIcons();
  
  // Attach cart listeners directly to newly generated buttons
  const newAddBtns = productGrid.querySelectorAll('.cart-add');
  newAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Small animation
      cartCount++;
      cartBadge.innerText = cartCount;
      const target = e.currentTarget;
      target.style.transform = 'scale(0.8)';
      setTimeout(() => target.style.transform = 'scale(1)', 150);
    });
  });

  // Handle Load more button visibility
  if (endIndex >= filteredProducts.length) {
    loadMoreContainer.style.display = 'none';
  } else {
    loadMoreContainer.style.display = 'block';
  }
}

function createSkeletons(count) {
  let html = '';
  for(let i=0; i<count; i++) {
    html += `
      <div class="product-card" style="height: 380px;">
        <div class="skeleton" style="height: 200px; width: 100%;"></div>
        <div style="padding: 1rem;">
          <div class="skeleton" style="height: 12px; width: 40%; margin-bottom: 10px;"></div>
          <div class="skeleton" style="height: 20px; width: 90%; margin-bottom: 20px;"></div>
          <div class="skeleton" style="height: 25px; width: 60%;"></div>
        </div>
      </div>
    `;
  }
  return html;
}

// Event Listeners for Filters
searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

categoryRadios.forEach(r => r.addEventListener('change', applyFilters));
ratingRadios.forEach(r => r.addEventListener('change', applyFilters));

priceRange.addEventListener('input', (e) => {
  priceValue.innerText = Number(e.target.value).toLocaleString('en-IN');
});
priceRange.addEventListener('change', applyFilters);

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  renderProducts();
});
