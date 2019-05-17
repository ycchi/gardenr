
const express = require('express');
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// eslint-disable-next-line no-unused-vars
const passportConfig = require('./config/passport');

require("dotenv").config();
const keys = require('./config/keys');


// set up app
const app = express(); 
const PORT = process.env.PORT || 3000; 

// set up cookie session
app.use(cookieSession({
  // expire in 1 hr in ms
  maxAge: 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// set up templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// set up database info
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/gardenr';
mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true
}, () => {
   console.log(`CONNECTED TO MONGODB`)
});

// set up routes
const routes = require("./routes");

app.use(routes); 




// set up routes

app.get("/", (req, res) =>{
  res.render('index')
});




// const authCheck = (req, res, next) => {
//   if(!req.user){
//      console.log('you are not logged in!!!');
//       res.redirect('/auth/login');
//   } else {
//      console.log(`authCheck req.user._id: ${req.user._id}`)
//       next();
//   }
// };

// const db = require("./models");

// app.post("/api/gardens", authCheck, (req, res) => {


//   db.Garden.create(req.body)
//    .then((dbGarden) => {
     
//      return db.User.findOneAndUpdate({
//        username: req.user.username
//     }, 
//     { 
//       $push: { gardens: dbGarden._id } 
//     }, 
//     { 
//       new: true 
//     });
//    })
//    .then((dbUser) => {
//      // If the User was updated successfully, send it back to the client
//      res.json(dbUser);
//    })
//    .catch((err) => {
//      // If an error occurs, send it back to the client
//      res.json(err);
//    });
// });






app.listen(PORT, () => console.log(`🗺️ => now listening on http://localhost:${PORT}`));
