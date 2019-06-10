const mongoose = require("mongoose");


// Object destructuring
const { Schema } = mongoose;



const LogSchema = new Schema({
   logDate: {
      type: String,
      required: true,
   },
   logBody: {
      type: String
   },
   rain: {
      type: Number
   },
   avgTemp: {
      type: Number
   },
   height: {
      type: Number
   },
   output: {
      type: Number
   }

});


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
   zipcode: {
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