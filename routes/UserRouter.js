const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body);
    user
      .save()
      .then(() => {
        const token = user.AuthToken();
        res.status(201).send({ user, token });
      })
      .catch((e) => {
        res.status(400).send(e.message);
      });
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.AuthToken();
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000),
      httpOnly: true,
    });
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;