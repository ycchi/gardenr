
// dependencies
const { User } = require('../models');
const db = require('../models');
const handle = require('../utils/promiseHandler');


// GET gardens '/api/gardens' for a user
const getUser = async (req, res) => {

   console.log(`RUNNING: getGardens`);
   console.log(`api/gardens req: ${req.user}`)
   const [userErr, gardenData] = await handle(User.findById(req.user._id, 'gardens'));
 
   if (userErr) {
     return res.json(500).json(userErr);
   }
 
   return res.status(200).json(gardenData);
 };


// POST garden '/api/gardens'
const addGarden = (req, res) => {

  
  console.log(`RUNNING: addGarden`);

   db.Garden.create(req.body)
    .then((dbGarden) => {
      
      return db.User.findOneAndUpdate({
        username: req.user.username
     }, 
     { 
      $push: { gardens: dbGarden._id } 
      // $push: { gardens: dbGarden.name } 
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



 // GET Garden populated under user obj
 function getUserGardens (req, res) {
   // Find user by id
   db.User.findById(req.user._id)
     // Specify that we want to populate the retrieved users with any associated gardens
     .populate("gardens")
     .then((dbUser) => {
       // If able to successfully find and associate all Users and gardens, send them back to the client
       res.json(dbUser);
     })
     .catch((err) => {
       // If an error occurs, send it back to the client
       res.json(err);
     });
 };


// DELETE plant
function deletePlant (req, res) {
  console.log(`RUNNING: deletePlant`)
  console.log(req.body)
  db.Garden.deleteOne({name: req.user.garden.name})
  .then((dbGarden) => res.json(dbGarden))
  .catch(err => res.json(err))
}


// POST garden '/api/gardens'
const addLog = (req, res) => {

  console.log(`RUNNING: addLog`);

   db.Log.create(req.body)
    .then((dbLog) => {
      
      return db.Garden.findOneAndUpdate({
        name: req.Garden.name
     }, 
     { 
      $push: { logs: dbLog_id } 
      // $push: { gardens: dbGarden.name } 
     }, 
     { 
       new: true 
     });
    })
    .then((dbGarden) => {
      // If the User was updated successfully, send it back to the client
      res.json(dbGarden);
    })
    .catch((err) => {
      // If an error occurs, send it back to the client
      res.json(err);
    });
 }


 module.exports = {
    addGarden,
    getUser,
    getUserGardens,
    addLog,
    deletePlant
 }