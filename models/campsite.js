const { DataTypes } = require("sequelize");
const db = require("../db");

const Campsite = db.define("campsite", {
    siteName: {
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
    owner_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        // unique: false,
    }
});

module.exports = Campsite