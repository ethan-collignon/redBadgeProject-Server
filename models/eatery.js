const { DataTypes } = require("sequelize");
const db = require("../db");

const Eatery = db.define('eatery', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
});

module.exports = Eatery