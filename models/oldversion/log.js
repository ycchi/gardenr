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
   },
   rainTotal: {
      type: Number
   },
   avgTemp: {
      type: Number
   }
});

const Log = mongoose.model("Log", LogSchema);


module.exports = Log;