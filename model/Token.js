const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
 
});

module.exports = Token = mongoose.model('token', TokenSchema);
