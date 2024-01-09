const Sequelize = require("sequelize");
const db = require("../database/Connection");

module.exports = db.define("refresh_token", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
  },
  refresh_token: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
