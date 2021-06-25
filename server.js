const express = require('express');
const cors = require('cors');

const app = express();
// Setanado as configurações do CORS.
var corsOptions = {
origin: 'http://localhost:4200'
};

// Ativando a configuração CORS
app.use(cors(corsOptions));

// Parseando requisições do tipo JSON - application/json
app.use(express.json());

// Parseando requisições do tipo HTML - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Uma rota que responde um JSON simples
app.get('/', (req, res) => {
    res.json({ msg: 'Está funcionando!' });
});

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch(err => {
    console.log('Não foi possível conectar ao banco de dados', err);
    process.exit();
  });

require('./app/routes/contact.routes')(app);
// "Executa" o servidor, escutando em uma porta específica.

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}.`);
});