const CartController = () => {
  return {
    index(req, res) {
      res.render("cart/cart");
    },
    update(req, res) {
      if(!req.session.cart){
          req.session.cart = {
              items : {},
              totalQnt : 0,
              totalPrice : 0
          }
      }
      // let cart = req.session.cart
      let cart = req.session.cart;

      //! check if item does not exited in cart
      if(!cart.items[req.body._id]) {
          cart.items[req.body._id] = {
              item : req.body,
              qty : 1,
          },
          cart.totalQnt = cart.totalQnt + 1,
          cart.totalPrice = cart.totalPrice + req.body.price
      }else{
          cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1,
          cart.totalQnt = cart.totalQnt + 1,
          cart.totalPrice = cart.totalPrice + req.body.price
      }

      return res.json({ totalQnt : req.session.cart.totalQnt })

      // if (!cart.items[req.body._id]) {
      //   cart.items[req.body._id] = {
      //     item: req.body,
      //     qty: 1,
      //   };
      //   cart.totalQty = cart.totalQty + 1;
      //   cart.totalPrice = cart.totalPrice + req.body.price;
      // } else {
      //   cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
      //   cart.totalQty = cart.totalQty + 1;
      //   cart.totalPrice = cart.totalPrice + req.body.price;
      // }
      // return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
};

module.exports = CartController;
