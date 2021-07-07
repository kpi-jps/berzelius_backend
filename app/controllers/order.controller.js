const db = require("../models/index");
const Order = db.orders;
// Adicionar um novo pedido
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar o novo pedido
    if (!req.body.userLogin || !req.body.productId || !req.body.name || !req.body.description || !req.body.unity || !req.body.quantity || !req.body.status) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    }
    const order = new Order({
        userLogin: req.body.userLogin,
        productId: req.body.productId,
        name: req.body.name,
        description: req.body.description,
        unity: req.body.unity,
        quantity: req.body.quantity,
        status: req.body.status
    });
    // Depois de criado o objeto (aqui no caso um pedido), vamos salvá-lo no banco de dados.
    order.save(order).then(data => {
        // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB
            res.send(data)
        }).catch(err => {
        // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro
            res.status(500).send({
            msg: err.message
        });
    });
};

// Retornar a lista de pedidos
exports.findAll = (req, res) => {
    /* se condition estiver vazia = seleciona todos itens (neste caso pedidos)
    é possível fazer seleções específicas adicionando condições específicas a variável
    condition*/
    var condition = {};
    Order.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de contatos" })
    });
};

// Retornar um pedido específico
exports.findOne = (req, res) => {
    /* 
    Ao contrario de informações enviados pelo serviço, o "id" de cada pedido
    é tratado automaticamente pelo Mongo/Mongoose. Por isso, não se usa req.body
    mas sim req.params 
    */
    const id = req.params.id;
    Order.findById(id).then(data => {
        if (!data) {
            res.status(404).send({ msg: "Contato não encontrado" });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter contato com id=" + id })
    });
};

// Atualiza um pedido
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }
    const id = req.params.id;
    Order.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar pedido" })
        } else {
            res.send({ msg: "Pedido atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o pedido" });
    });
};

// Remover um pedido específico
exports.delete = (req, res) => {
    const id = req.params.id;
    Order.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível deletar o pedido" });
        } else {
            res.send({ msg: "Pedido deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o pedido" });
    });
};
