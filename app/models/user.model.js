//criando o modelo de usuários que será usado na aplicação
module.exports = mongoose => {
    const User = mongoose.model(
    "user",
    mongoose.Schema(
        {
            name: String,  //nome do usuário
            email: String, //email do usuário
            login: String, //login do usuário   
            password: String, //senha
            adm: Boolean, //true se é administrador do sistema, false se não (isto só pode ser alterado por admistradores)
        },
            { timestamps: true }
        )
    );
    return User;
};