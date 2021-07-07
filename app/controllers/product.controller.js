const db = require("../models/index");
const Product = db.orders;
// Adicionar um novo produto ao banco de dados
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar o novo produto
    if (!req.body.name || !req.body.description || !req.body.unity || !req.body.quantity) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        unity: req.body.unity,
        quantity: req.body.quantity,
        obs: req.body.obs
    });
    // Depois de criado o objeto (aqui no caso um produto), vamos salvá-lo no banco de dados.
    product.save(product).then(data => {
        // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB
            res.send(data)
        }).catch(err => {
        // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro
            res.status(500).send({
            msg: err.message
        });
    });
};

// Retornar a lista de produtos
exports.findAll = (req, res) => {
    /* se condition estiver vazia = seleciona todos itens (neste caso produtos)
    é possível fazer seleções específicas adicionando condições específicas a variável
    condition*/
    var condition = {};
    Product.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de contatos" })
    });
};

// Retornar um pedido específico
exports.findOne = (req, res) => {
    /* 
    Ao contrario de informações enviados pelo serviço, o "id" de cada produto
    é tratado automaticamente pelo Mongo/Mongoose. Por isso, não se usa req.body
    mas sim req.params 
    */
    const id = req.params.id;
    Product.findById(id).then(data => {
        if (!data) {
            res.status(404).send({ msg: "Contato não encontrado" });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter contato com id=" + id })
    });
};

// Atualiza um produto
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar pedido" })
        } else {
            res.send({ msg: "Pedido atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o pedido" });
    });
};

// Remover um produto específico
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível deletar o pedido" });
        } else {
            res.send({ msg: "Pedido deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o pedido" });
    });
};
