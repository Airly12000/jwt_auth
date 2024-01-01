const express = require("express");
const cors = require("cors");
const path = require("path");
const Users = require("./routes/Users");
const Messages = require("./routes/Messages");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(
  "/test",
  (req, res, next) => {
    req.body.name = "halo";
    next();
  },
  (req, res) => {
    const body = req.body;
    res.json({ name: body.name });
  }
);
app.use("/users", Users);
app.use("/messages", Messages);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
