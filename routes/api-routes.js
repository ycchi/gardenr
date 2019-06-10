
const router = require("express").Router();
const { updateUserZipcode, getUser } = require('../controllers/userController');

const { getPlants, getPlantById, addPlant, updatePlant, deletePlant, findPlants } = require("../controllers/plantController");

const { addLog } = require("../controllers/logController")



const { getWeatherData } = require("../controllers/weatherController");





const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};


router.get("/weather", authCheck, getWeatherData);


router.put("/user", authCheck, updateUserZipcode);
router.get("/user", authCheck, getUser);

router.get("/plants", authCheck, findPlants);
// router.get("/plants", authCheck, getPlants);
router.get("/plants/:id", authCheck, getPlantById);
router.post("/plants", authCheck, addPlant);
router.put("/plants/:id", authCheck, updatePlant);
router.delete("/plants/:id", authCheck, deletePlant);

router.post("/logs", authCheck, addLog);

module.exports = router;
