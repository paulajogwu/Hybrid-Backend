const router = require("express").Router();
const { Order } = require('../controller/orderController');
const { findAll } = require('../controller/userController');
const { AddToCart, ReduceCart, RemoveFromCart, IncreaseCart,findOne } = require('../controller/productController');



router.get('/add-to-cart/:seller_id', AddToCart);
router.get('/reduce-cart-item/:seller_id', ReduceCart);
router.get('/remove-item-from-cart/:seller_id', RemoveFromCart);
router.get('/increase-cart-item/:seller_id', IncreaseCart);

router.get('/list-of-sellers', findAll);

router.get('/seller-catalog/:seller_id', findOne);

router.post('/create-order', Order);




module.exports = router;