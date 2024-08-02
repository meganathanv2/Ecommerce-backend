const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    customer_phone: { type: Number, required: true },
    customer_address: { type: String, required: true },
    order_Data: { type: Array, required: true },
    Estimator_date: { type: Date, required: true },
    products: { type: Array, required: true },
    Total_amount: { type: Number, required: true },
    order_status: { type: String, required: true }, 
    user_id: { type: String, required: true },
    user_email: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
