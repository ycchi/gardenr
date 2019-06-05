
const router = require("express").Router();
const mongoose = require("mongoose");

const { getPlants, getPlantById, addPlant, updatePlant, deletePlant } = require("../controllers/plantController");

const { getWeatherData } = require("../controllers/weatherController");



const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};


// router.get("/user", authCheck, getUser);
// router.post("/user", authCheck, addGarden);
// router.get("/gardens", authCheck, getUserGardens);
// router.delete("/gardens", authCheck, deletePlant)
// router.get("/gardens/logs", authCheck, addLog)


// router.get("/user", authCheck, getUserPlants);

router.get("/weather", authCheck, getWeatherData);


router.get("/plants", authCheck, getPlants);
router.get("/plants/:id", authCheck, getPlantById);
router.post("/plants", authCheck, addPlant);
router.put("/plants/:id", authCheck, updatePlant);
router.delete("/plants/:id", authCheck, deletePlant);



module.exports = router
