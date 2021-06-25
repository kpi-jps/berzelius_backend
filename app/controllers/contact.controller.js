const db = require("../models");
const Contact = db.contact;
// Adicionar um novo contato
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar um produto
    if (!req.body.name || !req.body.email || !req.body.phone) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    }
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    // Depois de criado o objeto (aqui no caso um contato), vamos salvá-lo no banco de dados.
    contact.save(contact).then(data => {
        // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB
            res.send(data)
        }).catch(err => {
        // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro
            res.status(500).send({
            msg: err.message
        });
    });
};

// Retornar a lista de contatos
exports.findAll = (req, res) => {
    /* se condition estiver vazia = seleciona todos itens (neste caso contatos)
    é possível fazer seleções específicas adicionando condições específicas a variável
    condition*/
    var condition = {};
    Contact.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de contatos" })
    });
};

// Retornar um produto específico
exports.findOne = (req, res) => {
    /* 
    Ao contrario de informações enviados pelo serviço, o "id" de cada produto
    é tratado automaticamente pelo Mongo/Mongoose. Por isso, não se usa req.body
    mas sim req.params 
    */
    const id = req.params.id;

    Contact.findById(id).then(data => {
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

    Contact.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o Produto" })
        } else {
            res.send({ msg: "Produto atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o Produto" });
    });

};


// Remover um contato específico
exports.delete = (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o Produto" });
        } else {
            res.send({ msg: "Produto deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o Produto" });
    });
};
// Deletando todos os contatos
exports.deleteAll = (req, res) => {
    Contact.deleteMany({})
      .then(data => {
        res.send({ msg: `Todos o(s) ${data.deletedCount} contatos foram deletados!`});
      })
      .catch(err => {
        res.status(500).send({ msg:"Algum erro ocorreu durante o processo." });
      });
  };