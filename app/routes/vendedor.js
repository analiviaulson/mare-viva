const express = require('express');
const router = express.Router();
const { isVendedor, isNaoAutenticado } = require('../middleware/auth');

/**
 * Rotas da Área do Vendedor
 * Prefixo: /vendedor
 */

// Rota de login do vendedor
router.get('/login', isNaoAutenticado, (req, res) => {
  res.render('pages/vendedor/login', {
    title: 'Login - Vendedor'
  });
});

// Rota de cadastro do vendedor
router.get('/cadastro', isNaoAutenticado, (req, res) => {
  res.render('pages/vendedor/cadastro', {
    title: 'Cadastro - Vendedor'
  });
});

// Rota do dashboard do vendedor
router.get('/dashboard', isVendedor, (req, res) => {
  res.render('pages/vendedor/dashboard', {
    title: 'Dashboard - Vendedor',
    user: req.session.user
  });
});

// Rota para listar produtos do vendedor
router.get('/produtos', isVendedor, (req, res) => {
  res.render('pages/vendedor/produtos', {
    title: 'Meus Produtos - Vendedor',
    user: req.session.user
  });
});

// Rota para formulário de novo produto
router.get('/produtos/novo', isVendedor, (req, res) => {
  res.render('pages/vendedor/produto-form', {
    title: 'Novo Produto - Vendedor',
    user: req.session.user,
    produto: null
  });
});

// Rota para editar produto
router.get('/produtos/:id/editar', isVendedor, (req, res) => {
  // Aqui você buscaria o produto do banco de dados
  res.render('pages/vendedor/produto-form', {
    title: 'Editar Produto - Vendedor',
    user: req.session.user,
    produto: { id: req.params.id }
  });
});

// Rota para listar pedidos do vendedor
router.get('/pedidos', isVendedor, (req, res) => {
  res.render('pages/vendedor/pedidos', {
    title: 'Meus Pedidos - Vendedor',
    user: req.session.user
  });
});

// Rota para visualizar detalhes de um pedido
router.get('/pedidos/:id', isVendedor, (req, res) => {
  res.render('pages/vendedor/pedido-detalhes', {
    title: 'Detalhes do Pedido - Vendedor',
    user: req.session.user,
    pedidoId: req.params.id
  });
});

// Rota para perfil do vendedor
router.get('/perfil', isVendedor, (req, res) => {
  res.render('pages/vendedor/perfil', {
    title: 'Meu Perfil - Vendedor',
    user: req.session.user
  });
});

// Rota para logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/');
  });
});

// POST - Login do vendedor (processamento do formulário)
router.post('/login', isNaoAutenticado, (req, res) => {
  // Aqui você faria a validação e autenticação
  // Por enquanto, apenas simulamos
  const { email, senha } = req.body;
  
  // Validação básica
  if (!email || !senha) {
    return res.render('pages/vendedor/login', {
      title: 'Login - Vendedor',
      erro: 'Email e senha são obrigatórios'
    });
  }

  // Aqui você buscaria no banco de dados
  // Para este exemplo, apenas simulamos um login bem-sucedido
  req.session.user = {
    id: 1,
    email: email,
    nome: 'Vendedor Teste',
    role: 'vendedor'
  };

  res.redirect('/vendedor/dashboard');
});

// POST - Cadastro do vendedor (processamento do formulário)
router.post('/cadastro', isNaoAutenticado, (req, res) => {
  // Aqui você faria a validação e criação do usuário
  const { nome, email, senha, confirmaSenha } = req.body;

  // Validação básica
  if (!nome || !email || !senha || !confirmaSenha) {
    return res.render('pages/vendedor/cadastro', {
      title: 'Cadastro - Vendedor',
      erro: 'Todos os campos são obrigatórios'
    });
  }

  if (senha !== confirmaSenha) {
    return res.render('pages/vendedor/cadastro', {
      title: 'Cadastro - Vendedor',
      erro: 'As senhas não conferem'
    });
  }

  // Aqui você salvaria no banco de dados
  // Para este exemplo, apenas simulamos um cadastro bem-sucedido
  req.session.user = {
    id: 1,
    email: email,
    nome: nome,
    role: 'vendedor'
  };

  res.redirect('/vendedor/dashboard');
});

module.exports = router;

