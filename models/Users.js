const Sequelize = require("sequelize");
const db = require("../database/Connection");

module.exports = db.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
