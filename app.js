
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', __dirname);

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mare-viva-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Em produção, usar true com HTTPS
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.static(path.join(__dirname, 'images')));

// Rotas
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

app.get('/contribuir', (req, res) => {
    res.render('contribuir');
});

app.get('/denuncias', (req, res) => {
    res.render('denuncias');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/loja', (req, res) => {
    res.render('loja');
});

app.get('/metas', (req, res) => {
    res.render('metas');
});

app.get('/noticias', (req, res) => {
    res.render('noticias');
});

app.get('/parcerias', (req, res) => {
    res.render('parcerias');
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

// Rotas de Vendedor
app.get('/login-vendedor', (req, res) => {
    res.render('login-vendedor');
});

app.get('/cadastro-vendedor', (req, res) => {
    res.render('cadastro-vendedor');
});

app.get('/painel-vendedor', (req, res) => {
    // Verificar se o vendedor está logado
    if (!req.session.vendedorLogado) {
        return res.redirect('/login-vendedor');
    }
    res.render('painel-vendedor', { vendedor: req.session.vendedor });
});

// Rotas de autenticação POST
app.post('/login-vendedor', (req, res) => {
    const { email, password } = req.body;
    
    // Simulação de autenticação (em produção, verificar no banco de dados)
    if (email && password && password.length >= 6) {
        req.session.vendedorLogado = true;
        req.session.vendedor = {
            email: email,
            nome: 'Vendedor Demo'
        };
        res.json({ success: true, message: 'Login realizado com sucesso!' });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

app.post('/cadastro-vendedor', (req, res) => {
    const { nomeEmpresa, email, password, nomeResponsavel, telefone } = req.body;
    
    // Simulação de cadastro (em produção, salvar no banco de dados)
    if (nomeEmpresa && email && password && nomeResponsavel && telefone) {
        // Cadastro bem-sucedido
        res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
    } else {
        res.status(400).json({ success: false, message: 'Dados incompletos' });
    }
});

app.post('/logout-vendedor', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao fazer logout' });
        }
        res.json({ success: true, message: 'Logout realizado com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

