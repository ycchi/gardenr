const mongoose = require("mongoose");


// Object destructuring
const { Schema } = mongoose;



const LogSchema = new Schema({
   logDate: {
      type: Date,
      required: true,
   },
   logBody: {
      type: Date
   },
   rainTotal: {
      type: Number
   },
   avgTemp: {
      type: Number
   }
});

// create subDocument for modeling plants in the garden
const PlantSchema = new Schema({

   specie: {
      type: String,
      // required: true
   },
   nickname: {
      type: String,
      // required: true
   },
   ownerId: {
      type: String,
   },
   plantedDate: {
      type: String
   },
   logs: [LogSchema]
});

const UserSchema = new Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   googleId: {
      type: String,
      required: true
   },
   zipCode: {
      type: String,
   },
   plants: [PlantSchema]
});



const User = mongoose.model('User', UserSchema);
const Plant = mongoose.model('Plant', PlantSchema);
const Log = mongoose.model('Log', LogSchema);

module.exports = { 
   User,
   Plant,
   Log
}