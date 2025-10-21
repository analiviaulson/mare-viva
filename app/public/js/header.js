(function() {
   const vendedorLogado = sessionStorage.getItem('vendedorLogado');
   if(!vendedorLogado) {
     const vendedorMenuItems = document.querySelectorAll('.vendedor');
     vendedorMenuItems.forEach(item => item.style.display = 'none');
   }
})();