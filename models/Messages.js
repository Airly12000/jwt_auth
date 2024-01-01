const Sequelize = require("sequelize");
const db = require("../database/Connection");

module.exports = db.define("message", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
