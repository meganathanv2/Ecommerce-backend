const getOrderModel = require('../models/getOrderModel');
const ProductModel = require('../models/productModel'); // Ensure this model is defined

const addOrder = async (req, res) => {
    try {
        const {
            customer_name, customer_phone, customer_address, order_Data, Estimator_date, products, Total_amount, order_status, user_id, user_email
        } = req.body;

        const order = await getOrderModel.create({
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
        const { user_id } = req.body;
        const orders = await getOrderModel.find({ user_id });

        const orderDetails = await Promise.all(
            orders.map(async (ord) => {
                let subtotal = 0;

                const products = await Promise.all(
                    ord.products.map(async (prod) => {
                        const product = await ProductModel.findOne({ _id: prod.product_id });
                        subtotal += product.price * prod.quantity;

                        return {
                            product_id: prod.product_id,
                            quantity: prod.quantity,
                            product_name: product.name,
                            product_price: product.price
                        };
                    })
                );

                return {
                    order_id: ord._id,
                    customer_name: ord.customer_name,
                    customer_phone: ord.customer_phone,
                    customer_address: ord.customer_address,
                    order_date: ord.order_date,
                    products,
                    subtotal,
                    Total_amount: ord.Total_amount,
                    order_status: ord.order_status
                };
            })
        );

        res.status(200).json({ orders: orderDetails });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {addOrder ,getOrder};
