const mongoose = require("mongoose");

// Save a reference to the Schema constructor
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

const Garden = mongoose.model("Garden", GardenSchema);

module.exports = Garden;