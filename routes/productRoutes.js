const express = require("express");
const Router = express.Router();
const productController = require("../controllers/productController");
const auth=require("../middlewares/auth");

Router.get('/getProducts',auth, productController.getAllProducts);
Router.post('/post', productController.createProduct);
Router.put('/updateProduct/:id', productController.updateProduct);
Router.delete('/delete/:id',productController.deleteProduct);

module.exports = Router;