const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use(express.static(path.join(__dirname, 'app/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const rotas = require('./app/routes/router');
app.use('/', rotas);

try {
    app.listen(port, err => {
    if (err) console.error(err);
    else console.log(`Servidor online em http://localhost:${port}`);
    });
} catch (error) {
    console.log("Erro ao iniciar o servidor: " + error);
}