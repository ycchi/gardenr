
const router = require("express").Router();


const { getPlants, getPlantById, addPlant, updatePlant, deletePlant } = require("../controllers/plantController");

const { getWeatherData } = require("../controllers/weatherController");

const { updateUserZipcode, getUser } = require('../controllers/userController');



const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};


router.get("/weather", authCheck, getWeatherData);


// returns all plants regardless of User
router.get("/plants", authCheck, getPlants);
router.get("/plants/:id", authCheck, getPlantById);
router.post("/plants", authCheck, addPlant);
router.put("/plants/:id", authCheck, updatePlant);
router.delete("/plants/:id", authCheck, deletePlant);

router.put("/user", authCheck, updateUserZipcode);
router.get("/user", authCheck, getUser);

module.exports = router;
