const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use(express.static('./app/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var rotas = require('./app/routes/router');
app.use('/', rotas);

try {
    app.listen(port, e => {
        console.log(`Servidor online\nHttp://localhost:${port}`);
        if (e)
            console.error(e);
    });
} catch (error) {
    console.log("Erro ao iniciar o servidor: " + error);
}