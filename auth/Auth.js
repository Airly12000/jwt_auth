const jwt = require("jsonwebtoken");
const path = require("path");
// const asyncHandler = require("express-async-handler");
const RefreshTokens = require("../models/RefreshTokens");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

let refreshTokens = [];

const genJWT = async (req, res, next) => {
  const username = req.body.username;
  const token = jwt.sign({ username }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(
    { username },
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  // refreshTokens.push(refreshToken);
  await RefreshTokens.create({ refresh_token: refreshToken });
  req.token = token;
  req.refreshToken = refreshToken;
  next();
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer TOKEN
  // const token = req.headers['x-access-token'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.json({ message: "No token" }).status(401);

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json({ auth: false, message: "auth failed" }).status(401);
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

const refreshJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Bearer TOKEN
  // const token = req.headers['x-access-token'];
  const refreshToken = authHeader && authHeader.split(" ")[1];
  if (!refreshToken) return res.json({ message: "No token" }).status(401);

  const found = await RefreshTokens.findAll({
    where: { refresh_token: refreshToken },
  });

  if (found) {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          res.json({ auth: false, message: "auth failed" }).status(403);
        } else {
          const { username } = decoded;
          req.token = jwt.sign(
            { username },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
          );
          next();
        }
      }
    );
  } else {
    res.json({ message: "Refresh token invalid" });
  }
};

const deleteJWT = async (req, res, next) => {
  await RefreshTokens.delete({
    where: { refresh_token: req.body.refreshToken },
  });
  // refreshTokens = refreshTokens.filter(
  //   (refreshToken) => refreshToken !== req.body.refreshToken
  // );
};

module.exports = { genJWT, verifyJWT, refreshJWT, deleteJWT };
