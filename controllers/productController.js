const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

const getAllProducts = async (req, res) => {
  console.log(req.user)
  try {
    const products = await Product.find();
    res.send(products);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Error retrieving products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      rating: {
        rate: req.body.rating?.rate,
        count: req.body.rating?.count
      }
    });
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error updating product" });
  }
};

const deleteProduct = async (req,res)=>{

  try{
    const product =await Product.findOneAndDelete({id:req.params.id})
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Error updating product" });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct ,deleteProduct};
