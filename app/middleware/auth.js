/**
 * Middleware para autenticação e autorização
 * Verifica se o usuário está autenticado e tem permissão para acessar certos recursos
 */

// Middleware para verificar se o usuário está autenticado como vendedor
const isVendedor = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'vendedor') {
    return next();
  }
  return res.redirect('/vendedor/login');
};

// Middleware para verificar se o usuário está autenticado como administrador
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.redirect('/admin/login');
};

// Middleware para verificar se o usuário está autenticado como cliente
const isCliente = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'cliente') {
    return next();
  }
  return res.redirect('/cliente/login');
};

// Middleware para verificar se o usuário está autenticado (qualquer role)
const isAutenticado = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/selecao-perfil');
};

// Middleware para verificar se o usuário NÃO está autenticado
const isNaoAutenticado = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  // Se estiver autenticado, redireciona para a página apropriada
  if (req.session.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  } else if (req.session.user.role === 'vendedor') {
    return res.redirect('/vendedor/dashboard');
  } else if (req.session.user.role === 'cliente') {
    return res.redirect('/loja');
  }
  return res.redirect('/');
};

module.exports = {
  isVendedor,
  isAdmin,
  isCliente,
  isAutenticado,
  isNaoAutenticado
};

