const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello Message" });
});

module.exports = router;
