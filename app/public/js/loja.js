document.addEventListener('DOMContentLoaded', function() {
  initializeStore();
});

function initializeStore() {
  const categoryFilter = document.getElementById('categoryFilter');
  const productSearch = document.getElementById('productSearch');
  const productsGrid = document.getElementById('productsGrid');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      filterProducts(this.value, productSearch.value);
    });
  }

  if (productSearch) {
    productSearch.addEventListener('input', function() {
      filterProducts(categoryFilter.value, this.value);
    });
  }

  const productBtns = document.querySelectorAll('.product-btn');
  productBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = productCard.querySelector('.product-price').textContent;

      this.textContent = 'Adicionado!';
      this.disabled = true;
      this.classList.add('btn-secondary');

      setTimeout(() => {
        this.textContent = 'Comprar';
        this.disabled = false;
        this.classList.remove('btn-secondary');
      }, 2000);

      alert(`${productName} (${productPrice}) foi adicionado ao carrinho!`);
    });
  });
}

function filterProducts(category, searchTerm) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    const productCategory = product.dataset.category || '';
    const productName = product.querySelector('.product-name').textContent.toLowerCase();
    const matchesCategory = !category || productCategory === category;
    const matchesSearch = !searchTerm || productName.includes(searchTerm.toLowerCase());
    product.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });
}


