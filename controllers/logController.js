/* eslint-disable no-underscore-dangle */

// dependencies
const { User } = require('../models/user');
const { Plant } = require('../models/user');
const { Log } = require('../models/user');


// READ/GET logs for a specific plant
// api/logs
const getLogs = (req, res) => {
   // plantId needs to be included in req from front-end
   Plant.findOne({_id: req.body.id})
      .populate("logs")
      .then(dbLogData => {
         res.status(200).json(dbLogData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      })
};


// READ/GET specific log
// api/logs/:id
const getLogById = (req, res) => {
   Log.findOne({_id: req.params.id})
      .then(dbLogData => {
         res.status(200).json(dbLogData)
      })
      .catch(err => {
         console.log(err);
         res.status(200).json(err);
      })
};

// CREATE/POST log
const addLog = (req, res) => {

   console.log(`RUNNING: addLog`)

   console.log(`req.body: ${req.body.logDate}`)
   console.log(`req.body.plantId: ${req.body.plantId}`)
   const log = {
      logDate: req.body.logDate,
      logBody: req.body.logBody,
      rain: req.body.rain,
      avgTemp: req.body.avgTemp,
      height: req.body.height,
      output: req.body.output
   }
  
   User.findById(req.user._id, (err, user) => {

      // find plant by id
      const plant = user.plants.id(req.body.plantId)

      plant.logs.push(log);
      // plant.save()
      user.save()
      
      
   })
   .then(dbUserData => {
      console.log(`dbUserData: ${dbUserData}`)
      res.status(200).json(dbUserData)})
   .catch(err => {
      console.log(err);
      res.status(500).json(err)
   })
};


// EDIT/PUT log
// api/logs/:id
const updateLog = (req, res) => {
   Log.updateOne({
      _id: req.params.id
   },
   {
      $set: req.body
   })
   .then(dbLogData => {
      res.status(200).json(dbLogData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   })
};


// REMOVE/DELETE log
// api/logs/:id
const deleteLog = (req, res) => {
   

   User.findById(req.user._id, (err, user) => {
      // find plant by id
      console.log(`req.query.plantId: ${req.query.plantId}`)
      console.log(`req.query.logId: ${req.query.logId}`)
      
      const plant = user.plants.id(req.query.plantId);
      
      plant.logs.pull({_id: req.query.logId});
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
   addLog,
   deleteLog
}