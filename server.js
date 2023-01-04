require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
require("./routes/website");
const mongoose = require("mongoose");
const Session = require("express-session");
const flash = require('express-flash')
const app = express();
const port = process.env.PORT || 3000;
const MongoStore = require('connect-mongo');
const passport = require('passport');


// mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pizza")
const connecting = mongoose.connection;
connecting.once('open',() => {
    console.log('database connection')
}).on('error', (error) => {
  console.warn('Some error', error);
});



//Session Config
app.use(Session({
  secret : process.env.COOKIE_SECRET,
  resave : false,
  store : MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL 
  }),
  saveUninitialized : false,
  cookie : {maxAge: 1000*60*60*24}
}));


//! passport config
const passportInit = require('./backend/config/passport');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//! global middleware
app.use((req,res,next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
});

// //! passport config
// const passportInit = require('./backend/config/passport');
// passportInit(passport)
// app.use(passport.initialize())
// app.use(passport.session())


app.use(flash())
app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(expressLayout);
require("./routes/website")(app);



//! set temples engine
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.listen(port, () => {
  console.log(`server running port ${port}`);
});
