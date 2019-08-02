const express = require('express');
const app = express();
const consign = require('consign');


consign()
.include('conexao/db.js')
.then('models')
.then ('libs')
.then('controller')
.into(app);

app.listen(3000, 'localhost', () => {
    console.log('Servidor rodando na porta 3000');
})
