const express = require('express');
const router = express.Router();


router.get('/cadastro-vendedor', (req, res) => {
  res.render('pages/cadastro-vendedor');
});

router.get('/cadastro', (req, res) => {
  res.render('pages/cadastro');
});

router.get('/contribuir', (req, res) => {
  res.render('pages/contribuir');
});

router.get('/denuncias', (req, res) => {
  res.render('pages/denuncias');
});

router.get('/index', (req, res) => {
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('pages/login');
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

router.get('/painel-vendedor', (req, res) => {
  res.render('pages/painel-vendedor');
});

router.get('/parcerias', (req, res) => {
  res.render('pages/parcerias');
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre');
});

module.exports = router;

