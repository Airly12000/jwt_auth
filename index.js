const express = require("express");
const cors = require("cors");
const path = require("path");
const Users = require("./routes/Users");
const Messages = require("./routes/Messages");
const { genJWT, verifyJWT, refreshJWT } = require("./auth/Auth");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/testGen", genJWT, (req, res) => {
  res.json({ token: req.token, refreshToken: req.refreshToken });
});
app.use("/testVer", verifyJWT, (req, res) => {
  res.json({ decoded: req.decoded });
});
app.use("/testRef", refreshJWT, (req, res) => {
  res.json({ token: req.token });
});
app.use("/users", Users);
app.use("/messages", verifyJWT, Messages);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
