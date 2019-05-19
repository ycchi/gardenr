
const router = require("express").Router();
const mongoose = require("mongoose");

const { getUser, addGarden, getUserGardens } = require("../controllers/gardenController");

const { getWeatherData } = require("../controllers/weatherController");

const db = require("../models")

const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};


router.get("/user", authCheck, getUser);
router.post("/user", authCheck, addGarden);

router.get("/gardens", authCheck, getUserGardens);

router.get("/weather", getWeatherData);





module.exports = router
