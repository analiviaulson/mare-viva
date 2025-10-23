document.addEventListener('DOMContentLoaded', function() {
  const vendedorLogado = sessionStorage.getItem('vendedorLogado');
  const vendedorEmail = sessionStorage.getItem('vendedorEmail');

  if (!vendedorLogado) {
    alert('Você precisa fazer login como vendedor para acessar esta página.');
    window.location.href = '/vendedor/login';
    return;
  }

  const emailEl = document.getElementById('vendedorEmail');
  if (emailEl) emailEl.textContent = vendedorEmail || 'vendedor@email.com';

  loadMockData();

  const logoutBtn = document.getElementById('logoutBtn');
  const addProdutoBtn = document.getElementById('addProdutoBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  if (addProdutoBtn) addProdutoBtn.addEventListener('click', addProduto);
});

function loadMockData() {
  document.getElementById('totalProdutos').textContent = '12';
  document.getElementById('vendasMes').textContent = '45';
  document.getElementById('receitaTotal').textContent = 'R$ 3.450,00';

  const produtos = [
    { nome: 'Garrafa Reutilizável Oceano', categoria: 'Acessórios', preco: 'R$ 45,00', estoque: 25, status: 'Ativo' },
    { nome: 'Camiseta Sustentável Maré', categoria: 'Vestuário', preco: 'R$ 89,00', estoque: 15, status: 'Ativo' },
    { nome: 'Sacola Ecológica Vida Marinha', categoria: 'Acessórios', preco: 'R$ 35,00', estoque: 50, status: 'Ativo' },
    { nome: 'Canudo de Bambu Kit 4un', categoria: 'Utensílios', preco: 'R$ 25,00', estoque: 5, status: 'Baixo Estoque' },
    { nome: 'Protetor Solar Reef Safe', categoria: 'Cuidados', preco: 'R$ 65,00', estoque: 30, status: 'Ativo' },
  ];

  const tbody = document.getElementById('produtosTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  produtos.forEach((produto, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${produto.nome}</strong></td>
      <td>${produto.categoria}</td>
      <td>${produto.preco}</td>
      <td>${produto.estoque}</td>
      <td>
        <span class="badge ${produto.status === 'Ativo' ? 'badge-success' : 'badge-warning'}">${produto.status}</span>
      </td>
      <td class="produto-actions">
        <button class="btn btn-secondary btn-icon" onclick="editarProduto(${index})"><i class="fa-solid fa-edit"></i></button>
        <button class="btn btn-secondary btn-icon" onclick="removerProduto(${index})"><i class="fa-solid fa-trash"></i></button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function logout() {
  sessionStorage.removeItem('vendedorLogado');
  sessionStorage.removeItem('vendedorEmail');
  alert('Logout realizado com sucesso!');
  window.location.href = '/';
}

function addProduto() {
  alert('Funcionalidade de adicionar produto será implementada em breve!');
}

function editarProduto(index) {
  alert(`Editar produto ${index + 1} - Funcionalidade será implementada em breve!`);
}

function removerProduto(index) {
  if (confirm('Tem certeza que deseja remover este produto?')) {
    alert(`Produto ${index + 1} removido!`);
    loadMockData();
  }
}



