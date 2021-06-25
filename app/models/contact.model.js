//criando o modelo de contatos que será usado na aplicação
module.exports = mongoose => {
    const Contact = mongoose.model(
    "contact",
    mongoose.Schema(
        {
            name: String,
            email: String,
            phone: String
        },
            { timestamps: true }
        )
    );
    return Contact;
};