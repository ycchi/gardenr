/* eslint-disable no-underscore-dangle */

// dependencies
const { User } = require('../models/oldversion');
const { Plant } = require('../models/oldversion');
const { Log } = require('../models/oldversion');


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
   Log.create(req.body)
      .then(dbLogData => {
         // find and update in plant schema
         // plantId required from front-end
         return Plant.findOneAndUpdate({
            _id: req.body.plantId
         },
         {
            $push: {logs: dbLogData._id}
         },
         {
            upsert: true,
            returnNewDocument: true
         })
      })
      .then(dbPlantData => {
         res.status(200).json(dbPlantData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
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
   Log.deleteOne({_id: req.params.id})
      .then(dbLogData => {
         res.status(200).json(dbLogData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err)
      })
}



module.exports = {

}