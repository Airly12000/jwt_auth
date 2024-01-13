const express = require("express");
const Messages = require("../models/Messages");

const router = express.Router();

const errorHandler = (error) => console.log(`Error: ${error}`);

router.post("/", async (req, res) => {
  const messages = await Messages.findAll({
    where: { username: req.body.username },
    attributes: ["message"],
  }).catch(errorHandler);
  res.json({ messages });
});

router.post("/post", async (req, res) => {
  const newMessage = await Messages.create({
    message: req.body.message,
    username: req.body.username,
  }).catch(errorHandler);
  if (newMessage) {
    res.json({ message: "message created" });
  } else {
    res.json({ message: "failed to create message" });
  }
});

module.exports = router;
