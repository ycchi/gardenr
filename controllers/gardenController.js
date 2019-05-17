
// dependencies
const { User } = require('../models');
const { Garden } = require('../models');
const handle = require('../utils/promiseHandler');


// GET bookmarks '/api/bookmarks' for a user
const getGardens = async (req, res) => {

   console.log(`RUNNING: getGardens`);
   console.log(`api/gardens req: ${req.user}`)
   const [userErr, gardenData] = await handle(User.findById(req.user._id, 'garden'));
 
   if (userErr) {
     return res.json(500).json(userErr);
   }
 
   return res.status(200).json(gardenData);
 };



// CREATE/POST bookmark for a user '/api/gardens'
const addGarden = async (req, res) => {   

   console.log(`RUNNING: addGarden`);
   console.log(req.user._id)

   const [gardenFindErr, userProfile] = await handle(User.findById(req.user._id));
 
   if (gardenFindErr) {
     return res.status(500).json(gardenFindErr);
   }
 
   // create new garden based on user using subdocuments

   // gardens, not a function
   // Gardens, cannot read property 'create' of undefined
   // garden, cannot read property 'create' of undefined
   // Garden, cannot read property 'create' of undefined
   // gardens
   const newGarden = userProfile.gardens.create(req.body);
 
   return User.findOneAndUpdate(
     {
       _id: req.user._id
     
     },
     {
       $addToSet: { gardens: newGarden }
     },
     {
       new: true
     }
   )
     .then(userInfo => {
       if (userInfo !== null) {
         return res.json(userInfo);
       }
       
       console.log(userInfo);

       return res.json({
         message: 'Link already saved'
       });
     })
     .catch(err => {
       console.log(err);
       return res.json(err);
     });
 };

 module.exports = {
    addGarden,
    getGardens
 }