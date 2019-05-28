/* eslint-disable no-underscore-dangle */

// dependencies
const { User } = require('../models');
const { Plant } = require('../models');



const getPlants = (req, res) => {

  console.log(`RUNNING: getPlant
    req.user._id: ${req.user._id}`)

  User.findOne({_id: req.user._id})
    .populate("plants")
    .then((dbPlantData) => {
      res.status(200).json(dbPlantData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
}


// api/plants/:id
// GET
// routes for grabbing a specific plant by id, populate it's logs
const getPlantById = (req, res) => {
  console.log(`RUNNING: getPlantById
  req.user._id: ${req.user._id}`)
  console.log(`req.params.id: ${req.params.id}`)

  // find user first
  Plant.findOne({_id: req.params.id})
    .populate("logs")
    .then((dbPlantData) => {
      res.status(200).json(dbPlantData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    })
}


// api/plants/
// POST
// /:id not required since passport provides logged in user info
const addPlant = (req, res) => {
  Plant.create(req.body)
    .then((dbPlantData) => {
      // req.user._id passed from PASSPORT authCheck
      return User.findOneAndUpdate({
        _id: req.user._id
      }, 
      {
        $push: {plants: dbPlantData._id}
      }, 
      {
        upsert: true,
        returnNewDocument: true
      })
    })
    .then((dbUserData) => {
      res.status(200).json(dbUserData)
    })
    .catch((err) => {
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
  Plant.deleteOne({_id: req.params.id})
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
    deletePlant
 }