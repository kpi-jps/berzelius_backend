module.exports = app => {
    const contact = require('../controllers/contact.controller');
    var router = require('express').Router();
    // Insere novo contato
    router.post('/', contact.create);
    // Retorna todos contatos
    router.get('/', contact.findAll);

    // Retorna o contato dado seu ID
    router.get('/:id', contact.findOne);

    // Atualiza o contato dado seu ID
    router.put('/:id', contact.update);

    // Remove um contato dado seu id
    router.delete('/:id', contact.delete);

    //Deletando todos os contatos
    router.delete('/', contact.deleteAll);

    
    app.use('/api/contatos', router);
};