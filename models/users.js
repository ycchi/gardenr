/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");
// const crypto = require("crypto");
// const jwt = require("jsonwebtoken");

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
      type: Number,
      required: true,
      unique: true
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
   garden: [GardenSchema]
});

// creating model
// 'Users' -> name of collection 
const User = mongoose.model('Users', UserSchema);

// export User
module.exports = User;