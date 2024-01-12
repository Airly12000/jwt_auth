const express = require("express");
const Messages = require("../models/Messages");

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await Messages.findAll({
    where: { username: req.body.username },
  });
  res.json({ messages });
});

module.exports = router;
