const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id:{
        type: String,
        requires:true,
    },
    products:[{
        product_id: String,
        quantity: String
    }],
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;