const express = require("express");
const bcrypt = require("bcrypt");
const { genJWT, deleteJWT } = require("../auth/Auth");
const Users = require("../models/Users");

const router = express.Router();

const errorHandler = (error) => console.log(`Error: ${error}`);

router.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

router.post("/register", genJWT, async (req, res) => {
  const body = req.body;
  const encrypted_password = await bcrypt.hash(body.password, 10);
  const newUser = await Users.create({
    name: body.name,
    username: body.username,
    password: encrypted_password,
  }).catch(errorHandler);
  if (newUser) {
    res.json({
      user: {
        token: req.token,
        refreshToken: req.refreshToken,
        username: body.username,
      },
    });
  } else {
    res.json({ message: "could not create user" });
  }
});

router.post("/login", genJWT, async (req, res) => {
  const body = req.body;
  const user = await Users.findAll({
    where: { username: body.username },
  }).catch(errorHandler);
  if (user.length !== 0) {
    const decoded = await bcrypt.compare(body.password, user[0].password);
    if (decoded) {
      res.json({
        user: {
          token: req.token,
          refreshToken: req.refreshToken,
          username: body.username,
        },
      });
    } else {
      res.json({ message: "wrong password" });
    }
  } else {
    res.json({ message: "no user found" });
  }
});

router.post("/logout", deleteJWT);

module.exports = router;
