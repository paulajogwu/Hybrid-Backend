const router = require("express").Router();
const { createProduct} = require('../controller/productController');
const { findOrder } = require('../controller/orderController');

router.post('/create-catalog',createProduct);

router.get('/orders',findOrder);



module.exports = router;