const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config({ path: path.join(__dirname, "../", ".env") });

module.exports = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorAliases: false,
  }
);
