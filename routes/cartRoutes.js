const express = require('express');
const router = express.Router();
const { addProductToCart, removeProductFromCart, getCart } = require('../controllers/cartController');

router.post('/add', addProductToCart);

router.get('/:user_id', getCart);
router.delete('/remove', removeProductFromCart);    

module.exports = router;