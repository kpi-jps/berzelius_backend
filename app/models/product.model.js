//criando o modelo de produto
module.exports = mongoose => {
    const Product = mongoose.model(
    "product",
    mongoose.Schema(
        {
            name: String,  //nome do produto
            description: String, //descrição do produto
            unity: String, ////unidade em que é medida a quantidade do produto
            quantity: Number, //quantidade do produto em estoque
            obs: String, //Observações sobre o produto
            inStock: Boolean //controle se o produto esta em estoque (true) ou não (false)
        },
            { timestamps: true }
        )
    );
    return Product;
};