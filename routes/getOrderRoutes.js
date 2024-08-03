const express = require('express');
const router = express.Router();
const getOrderController = require('../controllers/getOrderController');

router.post('/post', getOrderController.addOrder);
router.post('/getOrder', getOrderController.getOrder);

module.exports = router;
