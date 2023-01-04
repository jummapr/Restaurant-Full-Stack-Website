const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const AuthController = () => {
  return {
    Register(req, res) {
      res.render("auth/register");
    },
    async PostRegister(req, res) {
      const { name, email, password } = req.body;

      // ! validate the request
      if (!name || !email || !password) {
        req.flash("error", "all field are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //! check if email exited

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email Address Is Already Exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //! Hash The Password

      const Hash_Password = await bcrypt.hash(password, 10);

      //! create new user in the mongodb database
      const user = new User({
        name,
        email,
        password: Hash_Password,
      });

      user
        .save()
        .then((user) => {
          //* login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
    Login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.login(user, (err) => {
          if (err) {
            req.flash("error", info.message);
          return next(err);
          }

          return res.redirect('/')
        });
      })(req,res,next);
    },
    logout(req,res) {
      req.logout(() => {
            
      })
      return res.redirect('/')
    }
  };
};

module.exports = AuthController;
