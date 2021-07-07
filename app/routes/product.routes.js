module.exports = app => {
    const product = require('../controllers/user.controller');
    var router = require('express').Router();
    // Insere novo contato
    router.post('/', product.create);
    // Retorna todos contatos
    router.get('/', product.findAll);

    // Retorna o contato dado seu ID
    router.get('/:id', product.findOne);

    // Atualiza o contato dado seu ID
    router.put('/:id', product.update);

    // Remove um contato dado seu id
    router.delete('/:id', product.delete);

    app.use('/api/produtos', router);
};