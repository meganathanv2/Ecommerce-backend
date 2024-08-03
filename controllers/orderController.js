const Cart = require("../models/cartModel");  
const Order = require("../models/orderModel");

const addOrder = async (req, res) => {
    try {
        const { customer_name, customer_phone, customer_address } = req.body;
        const { user_id, user_email } = req.user;

        const CartDetails = await Cart.find({ user_id: user_id });

        if (CartDetails.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const subTotal = CartDetails.reduce((total, item) => total + (item.price * item.quantity), 0);

        const orderDetails = new Order({
            customer_name,
            customer_phone,
            customer_address,
            order_Data: CartDetails,
            Estimator_date: new Date(),
            products: CartDetails,
            Total_amount: subTotal,
            order_status: "Pending",
            user_id,
            user_email
        });

        const savedOrder = await orderDetails.save();
        await Cart.deleteMany({ user_id: user_id });

        res.status(201).json({ savedOrder });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addOrder, getOrder };
