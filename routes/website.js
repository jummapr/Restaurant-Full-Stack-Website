const AdminOrderController = require("../backend/http/controller/Admin/AdminOrderController");
const AuthController = require("../backend/http/controller/authCon");
const CartController = require("../backend/http/controller/Customers/CartCon");
const OrderController = require("../backend/http/controller/Customers/OrderController");
const Home_Controller = require("../backend/http/controller/HomeController");
const auth = require("../backend/http/middlewares/auth");
const gust = require("../backend/http/middlewares/gust");


const InitRoutes = (app) => {
  app.get("/", Home_Controller().index);
  app.get("/register", gust , AuthController().Register);
  app.post("/register", AuthController().PostRegister);
  app.get("/login", gust ,AuthController().Login);
  app.post("/login", AuthController().postLogin);
  app.post("/logout", AuthController().logout);

  app.get("/cart", CartController().index);
  app.post('/updateCart',CartController().update)

  //! Customer Router
  app.post('/orders', OrderController().store)
  app.get('/customer/orders', auth, OrderController().index)


  // admin routes
  app.get('/admin/orders', auth, AdminOrderController().index)
};

module.exports = InitRoutes;
