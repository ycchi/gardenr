
// dependencies
const { User } = require('../models');
const db = require('../models');
const handle = require('../utils/promiseHandler');


// GET bookmarks '/api/bookmarks' for a user
const getGardens = async (req, res) => {

   console.log(`RUNNING: getGardens`);
   console.log(`api/gardens req: ${req.user}`)
   const [userErr, gardenData] = await handle(User.findById(req.user._id, 'gardens'));
 
   if (userErr) {
     return res.json(500).json(userErr);
   }
 
   return res.status(200).json(gardenData);
 };



const addGarden = (req, res) => {

   db.Garden.create(req.body)
    .then((dbGarden) => {
      
      return db.User.findOneAndUpdate({
        username: req.user.username
     }, 
     { 
       $push: { gardens: dbGarden._id } 
     }, 
     { 
       new: true 
     });
    })
    .then((dbUser) => {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch((err) => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
 }





 module.exports = {
    addGarden,
    getGardens
 }