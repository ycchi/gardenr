
const router = require("express").Router();
const mongoose = require("mongoose");

const { getGardens, addGarden } = require("../controllers/gardenController");

const db = require("../models")

const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};


router.get("/gardens", authCheck, getGardens);
// router.post("/gardens", authCheck, addGarden);

// router.post("/gardens", authCheck, (req, res) => {
//    console.log(`req.body: ${req.body}`);

//    db.Garden.create(req.body)
//     .then((dbGarden) => {
      
//       return db.User.findOneAndUpdate({}, { $push: { notes: dbGarden._id } }, { new: true });
//     })
//     .then((dbUser) => {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });


// router.post("/gardens", addGarden);

module.exports = router
