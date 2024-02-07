const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartProduct: {
    type: Array,
    required: true,
  },
});
const User = mongoose.model("User", user);
module.exports = { User };
