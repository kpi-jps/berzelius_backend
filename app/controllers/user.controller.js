const db = require("../models/index");
const bcrypt = require('bcrypt'); //importando o módulo de encripitação
const saltRounds = 10; //bcrypt

const User = db.users;
// Adicionar um novo usuário ao sistema
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar um usuário
    if (!req.body.name || !req.body.email || !req.body.login || !req.body.password || !req.body.adm) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    }
    //encriptando senha
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            login: req.body.login,
            password: hash,
            adm: req.body.adm
        });
        // Depois de criado o objeto (aqui no caso um usuário), vamos salvá-lo no banco de dados.
        user.save(user).then(data => {
            // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB
                res.send(data)
            }).catch(err => {
            // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro
                res.status(500).send({
                msg: err.message
            });
        });
    });    
};

// Retornar a lista de usuários
exports.findAll = (req, res) => {
    /* se condition estiver vazia = seleciona todos itens (neste caso usuários)
    é possível fazer seleções específicas adicionando condições específicas a variável
    condition*/
    var condition = {};
    User.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de usuários" })
    });
    
};

// Retornar um contato específico 
exports.findOne = (req, res) => {
    /* 
    Ao contrario de informações enviados pelo serviço, o "id" de cada usuário
    é tratado automaticamente pelo Mongo/Mongoose. Por isso, não se usa req.body
    mas sim req.params 
    */
    const id = req.params.id;
    //const password = req.body.password;
    User.findById(id).then(data => {
        if (!data) {
            res.status(404).send({ msg: "Usuário não encontrado" });
        } else {

            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter usuário com id=" + id })
    });
};

// Atualiza um usuário
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar os dados do usuário" })
        } else {
            res.send({ msg: "Dados do usuário atualizados com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar dados de usuário" });
    });

};

// Remove um usuário específico
exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o Produto" });
        } else {
            res.send({ msg: "Produto deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o Produto" });
    });
};
