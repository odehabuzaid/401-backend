const mongoose = require('mongoose');


const FavSchema =  mongoose.Schema({
  title: String,
  description: String,
  toUSD: String,
  image: String,
});

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fav: [FavSchema],
});

// This creates our model from the above schema, using mongoose's model method
const UserModel = mongoose.model('Users', UserSchema);

// Export the Article model
module.exports = UserModel;
