const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
