const express = require ('express')
const path = require('path');
const app = express()
const port = 3000

app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use(express.static('./app/public'));
 
app.set('view engine' , 'ejs');
app.set('views', './app/views');
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
var rotas = require('./app/routes/router');
app.use('/', rotas);
 
app.listen(port, () => {
    console.log(`Servidor online\nHttp://localhost:${port}`);
});