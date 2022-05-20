const orderModel = require("../model/orderModel");
const Cart = require("../model/cartModel");

exports.Order = async (req, res) => {
    var cart = JSON.parse(new Cart(req.session.cart));
    let buyer_id = req.session.userId
    let seller_id = req.body.seller_id

    // requst information validation
    if (
        buyer_id == "" ||
        buyer_id == null ||
        seller_id == "" ||
        seller_id == null ||
        cart == "" ||
        cart == null
    ) {
        return res.send({
            status: false,
            message:
                "Fill out all required fields!",
            data: null,
        });
    } else {
        try {
            let newOrder = await orderModel.create({
                buyer_id,
                seller_id,
                cart,

            });
            return res.send({
                status: true,
                message: 'Created Successfully',
                data: newOrder
            });
        } catch (err) {

            return res.status(500).send({
                message: `Error: ${err}`,
            });
        }
    }

},
    exports.findOrder = async (req, res) => {


        const orders = await orderModel.findAll({})
        if (!orders) {
            return res.status(400).send({
                message: `No order found `,
            });
        }
        console.log("good", orders)
        return res.status(200).send(orders);


    }