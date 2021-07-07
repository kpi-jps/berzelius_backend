//criando o modelo pedidos que será usado na aplicação
module.exports = mongoose => {
    const Order = mongoose.model(
    "order",
    mongoose.Schema(
        {
            userLogin: String, //login do usuário   
            productId: String, // id do produto
            name: String,  //nome do produto
            description: String, //descrição do produto
            unity: String, //unidade em que é medida a quantidade do produto   
            quantity: Number,  //quantidade de produto pedida
            status: String //status do pedido

        },
            { timestamps: true }
        )
    );
    return Order;
};