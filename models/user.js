/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");


// Object destructuring
const { Schema } = mongoose;

// create subDocument for modeling plants in the garden
const PlantSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   plantedDate: {
      type: Date,
      required: true,
   },
   lastWaterDate: {
      type: Date
   },
   nextWaterDate: {
      type: Date
   },
   comments: {
      type: String
   }
});

// create subDocument for modeling plants in the garden
const GardenSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   // location datatype
   location: {
      type: String,
      required: true,
   },
   plantedDate: {
      type: String
   },
   plants: [PlantSchema]
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
   gardens: [
      {
         // Store ObjectIds in the array
         type: Schema.Types.ObjectId,
         // The ObjectIds will refer to the ids in the garden model
         ref: "Garden"
       }
   ]
});

// creating model
// 'Users' -> name of collection 
// const User = mongoose.model('User', UserSchema);

// export User
// module.exports = User;

module.exports = mongoose.model('User', UserSchema);