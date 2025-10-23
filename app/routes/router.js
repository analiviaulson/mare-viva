const express = require('express');
const router = express.Router();
const vendedorRoutes = require('./vendedor');
const adminRoutes = require('./admin');

router.get('/', (req, res) => {
  res.render('pages/index');
}); 

router.get('/index', (req, res) => {
  res.redirect('/');
});

router.get('/selecao-perfil', (req, res) => {
  res.render('pages/selecao-perfil');
});

router.get('/contribuir', (req, res) => {
  res.render('pages/contribuir');
});

router.get('/denuncias', (req, res) => {
  res.render('pages/denuncias');
});

router.get('/cliente/cadastro', (req, res) => {
  res.render('pages/cliente/cadastro-cliente');
});

router.get('/cliente/login', (req, res) => {
  res.render('pages/cliente/login-cliente');
});

router.get('/loja', (req, res) => {
  res.render('pages/loja');
});

router.get('/metas', (req, res) => {
  res.render('pages/metas');
});

router.get('/noticias', (req, res) => {
  res.render('pages/noticias');
});

router.get('/vendedor/login', (req, res) => {
  res.render('pages/vendedor/login-vendedor');
});

router.get('/vendedor/painel', (req, res) => {
  res.render('pages/vendedor/painel-vendedor');
});

router.get('/vendedor/cadastro', (req, res) => {
  res.render('pages/vendedor/cadastro-vendedor');
});

router.get('/parcerias', (req, res) => {
  res.render('pages/parcerias');
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre');
});
// Rotas da área do vendedor
router.use('/vendedor', vendedorRoutes);

// Rotas da área do administrador
router.use('/admin', adminRoutes);
module.exports = router;

