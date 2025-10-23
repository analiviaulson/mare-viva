const express = require('express');
const router = express.Router();
const { isAdmin, isNaoAutenticado } = require('../middleware/auth');

/**
 * Rotas da Área do Administrador
 * Prefixo: /admin
 */

// Rota de login do administrador
router.get('/login', isNaoAutenticado, (req, res) => {
  res.render('pages/admin/login', {
    title: 'Login - Administrador'
  });
});

// Rota do dashboard do administrador
router.get('/dashboard', isAdmin, (req, res) => {
  res.render('pages/admin/dashboard', {
    title: 'Dashboard - Administrador',
    user: req.session.user
  });
});

// Rota para listar usuários (clientes e vendedores)
router.get('/usuarios', isAdmin, (req, res) => {
  res.render('pages/admin/usuarios', {
    title: 'Gerenciar Usuários - Administrador',
    user: req.session.user
  });
});

// Rota para visualizar detalhes de um usuário
router.get('/usuarios/:id', isAdmin, (req, res) => {
  res.render('pages/admin/usuario-detalhes', {
    title: 'Detalhes do Usuário - Administrador',
    user: req.session.user,
    usuarioId: req.params.id
  });
});

// Rota para editar usuário
router.get('/usuarios/:id/editar', isAdmin, (req, res) => {
  res.render('pages/admin/usuario-form', {
    title: 'Editar Usuário - Administrador',
    user: req.session.user,
    usuarioId: req.params.id
  });
});

// Rota para listar todos os produtos
router.get('/produtos', isAdmin, (req, res) => {
  res.render('pages/admin/produtos', {
    title: 'Gerenciar Produtos - Administrador',
    user: req.session.user
  });
});

// Rota para visualizar detalhes de um produto
router.get('/produtos/:id', isAdmin, (req, res) => {
  res.render('pages/admin/produto-detalhes', {
    title: 'Detalhes do Produto - Administrador',
    user: req.session.user,
    produtoId: req.params.id
  });
});

// Rota para editar produto
router.get('/produtos/:id/editar', isAdmin, (req, res) => {
  res.render('pages/admin/produto-form', {
    title: 'Editar Produto - Administrador',
    user: req.session.user,
    produtoId: req.params.id
  });
});

// Rota para listar todos os pedidos
router.get('/pedidos', isAdmin, (req, res) => {
  res.render('pages/admin/pedidos', {
    title: 'Gerenciar Pedidos - Administrador',
    user: req.session.user
  });
});

// Rota para visualizar detalhes de um pedido
router.get('/pedidos/:id', isAdmin, (req, res) => {
  res.render('pages/admin/pedido-detalhes', {
    title: 'Detalhes do Pedido - Administrador',
    user: req.session.user,
    pedidoId: req.params.id
  });
});

// Rota para configurações do sistema
router.get('/configuracoes', isAdmin, (req, res) => {
  res.render('pages/admin/configuracoes', {
    title: 'Configurações - Administrador',
    user: req.session.user
  });
});

// Rota para relatórios
router.get('/relatorios', isAdmin, (req, res) => {
  res.render('pages/admin/relatorios', {
    title: 'Relatórios - Administrador',
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

// POST - Login do administrador (processamento do formulário)
router.post('/login', isNaoAutenticado, (req, res) => {
  // Aqui você faria a validação e autenticação
  const { email, senha } = req.body;

  // Validação básica
  if (!email || !senha) {
    return res.render('pages/admin/login', {
      title: 'Login - Administrador',
      erro: 'Email e senha são obrigatórios'
    });
  }

  // Aqui você buscaria no banco de dados
  // Para este exemplo, apenas simulamos um login bem-sucedido
  req.session.user = {
    id: 1,
    email: email,
    nome: 'Administrador',
    role: 'admin'
  };

  res.redirect('/admin/dashboard');
});

// POST - Criar novo usuário
router.post('/usuarios', isAdmin, (req, res) => {
  // Aqui você faria a validação e criação do usuário
  const { nome, email, role } = req.body;

  // Validação básica
  if (!nome || !email || !role) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios'
    });
  }

  // Aqui você salvaria no banco de dados
  res.status(201).json({
    sucesso: true,
    mensagem: 'Usuário criado com sucesso'
  });
});

// PUT - Atualizar usuário
router.put('/usuarios/:id', isAdmin, (req, res) => {
  const { nome, email, role } = req.body;

  // Validação básica
  if (!nome || !email || !role) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios'
    });
  }

  // Aqui você atualizaria no banco de dados
  res.json({
    sucesso: true,
    mensagem: 'Usuário atualizado com sucesso'
  });
});

// DELETE - Deletar usuário
router.delete('/usuarios/:id', isAdmin, (req, res) => {
  // Aqui você deletaria do banco de dados
  res.json({
    sucesso: true,
    mensagem: 'Usuário deletado com sucesso'
  });
});

module.exports = router;

