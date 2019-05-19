const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const { Schema } = mongoose;


// create subDocument for modeling plants in the garden
const LogSchema = new Schema({
   logDate: {
      type: Date,
      required: true,
   },
   logBody: {
      type: Date
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
   logs: [LogSchema]
});

const Garden = mongoose.model("Garden", GardenSchema);

module.exports = Garden;