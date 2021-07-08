module.exports = app => {
    const user = require('../controllers/user.controller');
    var router = require('express').Router();
    // Insere novo contato
    router.post('/', user.create);

    // concede acesso a usuário
    router.post('/:id', user.getAccess);

    // Retorna todos contatos
    router.get('/', user.findAll);

    // Retorna o contato dado seu ID
    router.get('/:id', user.findOne);

    // Atualiza o contato dado seu ID
    router.put('/:id', user.update);

    // Remove um contato dado seu id
    router.delete('/:id', user.delete);

    app.use('/api/usuarios', router);
};