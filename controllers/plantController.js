/* eslint-disable no-underscore-dangle */

// dependencies
// const { User } = require('../models');
const { User } = require('../models/user');
const { Plant } = require('../models/user');


// api/plants
// GET

// find where owner is...
const getPlants = (req, res) => {
  Plant.find()
    .then(dbPlantData => {
      res.status(200).json(dbPlantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}


const findPlants = (req, res) => {

  console.log(`RUNNING: findPlants`)
  
  User.find({_id: req.user._id})
  // .populate({
  //   path: 'plants'
  // })
  // .populate('plants')
  .then(dbPlantData => {
    console.log(dbPlantData[0].plants)
    res.status(200).json(dbPlantData[0].plants)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}


// api/plants/:id
// GET
// routes for grabbing a specific plant by id, populate it's logs
const getPlantById = (req, res) => {
  console.log(`RUNNING: getPlantById
  req.user._id: ${req.user._id}`)
  console.log(`req.params.id: ${req.params.id}`)

  // Plant.findOne({_id: req.params.id})
  //   .populate("logs")
  //   .then((dbPlantData) => {
  //     res.status(200).json(dbPlantData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err)
  //   })

  User.findById(req.user._id, (err,user) => {
    console.log(user.plants.id(req.params.id));
    const dbPlantData = user.plants.id(req.params.id);
    res.status(200).json(dbPlantData)
    
  })
}


// api/plants/
// POST
// /:id not required since passport provides logged in user info
const addPlant = (req, res) => {

  console.log(`RUNNING: addPlant`)
  
  // Plant.create(req.body)
  //   .then((dbPlantData) => {
  //     // req.user._id passed from PASSPORT authCheck
  //     return User.findOneAndUpdate({
  //       _id: req.user._id
  //     }, 
  //     {
  //       $push: {plants: dbPlantData}
  //     }, 
  //     {
  //       upsert: false,
  //       returnNewDocument: false
  //     }
  //     )
  //   })
  //   .then((dbUserData) => {
  //     res.status(200).json(dbUserData)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err)
  //   })

  User.findById(req.user._id, (err, user) => {
    
    const plant = {
      specie: req.body.specie,
      nickname: req.body.nickname,
      plantedDate: req.body.plantedDate
    }

    user.plants.push(plant);
    user.save();
  })
  .then(dbData => { 
    console.log(`dbData: ${dbData}`)
    res.status(200).json(dbData)})
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })

}









// api/plants/:id
// PUT
// Find Plant by id and update
const updatePlant = (req, res) => {
  Plant.updateOne({_id: req.params.id}, {$set: req.body})
    .then(dbPlantData => {
      res.status(200).json(dbPlantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}


// api/plants/:id
// DELETE
// Find Plant by id and delete
const deletePlant = (req, res) => {
  console.log(`RUNNING: removePlant`)
  // Plant.deleteOne({_id: req.params.id})
  //   .then(dbPlantData => {
  //     res.status(200).json(dbPlantData)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err)
  //   })

  User.findById(req.user._id, (err, user) => {
    user.plants.pull({_id: req.params.id});
    user.save();
  })
    .then(dbPlantData => {
      res.status(200).json(dbPlantData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}


 module.exports = {
    getPlants,
    getPlantById,
    addPlant,
    updatePlant,
    deletePlant,

    findPlants
 }