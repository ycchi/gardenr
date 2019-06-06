const { User } = require('../models/user');

const updateUserZipcode = (req, res) => {
   console.log(`RUNNING: updateUserZipcode`)
   console.log(`req.body: ${JSON.stringify(req.body)}`)

   const keys = Object.keys(req.body);
   console.log(`keys: ${req.body[keys[0]]}`)

   

   User.findByIdAndUpdate(
      req.user._id, 

      
      { $set: { zipcode: req.body[keys[0]] }}, 
      {new: true}
      )
      .then((dbUserData) => {
         console.log(dbUserData)
         res.status(200).json(dbUserData)
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err)
      })

}

module.exports = {
   updateUserZipcode
}