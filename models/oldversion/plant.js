const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const { Schema } = mongoose;




// create subDocument for modeling plants in the garden
const PlantSchema = new Schema({

   name: {
      type: String,
      required: true
   },
   ownerId: {
      type: String,
   },
   
   location: {
      type: String,
      required: true,
   },
   plantedDate: {
      type: String
   },
   logs: [
      {
         type: Schema.Types.ObjectId,
         ref: "Log"
      }
   ]
});

const Plant = mongoose.model("Plant", PlantSchema);


// did not work when exporting as an object: {Garden}
// error when second exports were stated.. 
// only allows one model per export?
module.exports = Plant;
