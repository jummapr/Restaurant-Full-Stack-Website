const AuthController = require("../backend/http/controller/authCon");
const CartController = require("../backend/http/controller/Customers/CartCon");
const Home_Controller = require("../backend/http/controller/HomeController");

const InitRoutes = (app) => {
  app.get("/", Home_Controller().index);
  app.get("/register", AuthController().Register);
  app.get("/login", AuthController().Login);

  app.get("/cart", CartController().index);
  app.post('/updateCart',CartController().update)
};

module.exports = InitRoutes;
