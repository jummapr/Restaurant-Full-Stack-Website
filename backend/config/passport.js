const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const Init = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //! check if user existed

        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "no email address exits" });
        }
        
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "user logged successFully" });
            }
            return done(null, false, {
              message: "wrong username and password",
            });
          })
          .catch((err) => {
            return done(null, false, { message: "something went wrong" });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = Init;
