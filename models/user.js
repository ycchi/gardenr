/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");


// Object destructuring
const { Schema } = mongoose;


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
   plants: [
      {
         // Store ObjectIds in the array
         type: Schema.Types.ObjectId,
         // The ObjectIds will refer to the ids in the plant model
         ref: "Plant"
       }
   ]
});



module.exports = mongoose.model('User', UserSchema);