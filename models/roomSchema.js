const mongoose = require("mongoose");
const conn = require("../utils/db");
const User = require("./user");

const RoomSchema = new mongoose.Schema({
  isEmpty: {
    type: Boolean,
  },
  bookedAt: {
    type: Date,
  },
  bookedTill: {
    type: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
  },
});
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
