const orderModel = require("../models/orderModel");

const addOrder = async (req, res) => {
    try {
        const {
            customer_name, customer_phone, customer_address, order_Data, Estimator_date, products, Total_amount, order_status, user_id, user_email
        } = req.body; 

        const order = await orderModel.create({
            customer_name, customer_phone, customer_address, order_Data, Estimator_date, products, Total_amount, order_status, user_id, user_email
        });

        res.status(201).json({ order });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await orderModel.find();
        res.status(200).json({ order });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addOrder, getOrder };
