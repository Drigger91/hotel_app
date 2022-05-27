const express = require("express");
const router = new express.Router();
const Room = require("../models/roomSchema");
const auth = require('../utils/auth')

router.post('/rooms',auth, async(req, res) => {
  const room = new Room({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await room.save();
    res.status(200).send(room);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/rooms", auth ,async (req, res) => {
  let user = req.user;
  try {
    user
      .populate({
        path: "rooms",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      })
      .then(() => {
        res.send(user.rooms);
      })
      .catch(() => {
        res.status(400).send();
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
});


module.exports = router;