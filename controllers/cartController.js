const Cart = require('../models/cartModel');


exports.addProductToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({ user_id, products: [{ product_id, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product_id === product_id);

            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.removeProductFromCart = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product_id !== product_id);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCart = async (req, res) => {
    try {
        const { user_id } = req.params;

        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};