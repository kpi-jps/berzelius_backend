module.exports = app => {
    const order = require('../controllers/order.controller');
    var router = require('express').Router();
    // Insere novo contato
    router.post('/', order.create);
    // Retorna todos contatos
    router.get('/', order.findAll);

    // Retorna o contato dado seu ID
    router.get('/:id', order.findOne);

    // Atualiza o contato dado seu ID
    router.put('/:id', order.update);

    // Remove um contato dado seu id
    router.delete('/:id', order.delete);

    app.use('/api/pedidos', router);
};