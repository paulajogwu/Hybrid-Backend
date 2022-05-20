const productModel = require("../model/productModel");
const Cart = require("../model/cartModel");


exports.createProduct = async (req, res) => {
  console.log("Product",req.body)
  const Name = req.body.name;
  const Price = req.body.price;
  const userName =  req.session.userName
  const seller_id =  req.session.user_id

  // requst information validation
  if (
    Name == "" ||
    Name == null ||
    Price == "" ||
    Price == null 
  ) {
    return res.send({
      status: false,
      message:
        "Fill out all required fields!",
      data: null,
    });
  } else {
    try {
      let newProduct = await productModel.create({
        Name,
        Price,
        userName,
        seller_id,
      });
      return res.send({
        status: true,
        message:'Created Successfully',
        data:newProduct
      });
    } catch (err) {

      return res.status(500).send({
        message: `Error: ${err}`,
      });
    }
  }
}


exports.AddToCart = async (req, res) => {
  var id = req.params.seller_id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  let data = await productModel.findOne({
    where: { id },
  });

  if (!product) {
    return res.status(400).send({
      message: `product Id does not Exist ${id} `,
    });
  }
  cart.add(data[0], id);
  req.session.cart = cart;

  res.status(200).json({
    status: true,
    message: 'Add to Cart successful',
})
 

}
exports.RemoveFromCart = async (req, res) => {

  var productId = req.params.seller_id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.status(200).json({
    status: true,
    message: 'Item removed from Cart successfully',
})
}
exports.ReduceCart = async (req, res) => {
  var productId = req.params.seller_id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.status(200).json({
    status: true,
    message: 'product quantity reduced successfully',
})
}

exports.IncreaseCart = async (req, res) => {
  var productId = req.params.seller_id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increaseByOne(productId);
  req.session.cart = cart;
  res.status(200).json({
    status: true,
    message: 'product quantity increased successfully',
})
}


exports.findOne = async (req, res) => {
  const { id } = req.params.seller_id;
  const seller = await productModel.findOne({
    where: { id },
  });
  if (!seller) {
    return res.status(400).send({
      message: `No seller found with this id : ${id}`,
    });
  }
  return res.status(200).send(seller);
}


