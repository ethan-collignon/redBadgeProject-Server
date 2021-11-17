     const Sequelize = require('sequelize');
     
     const sequelize = new Sequelize("postgres://postgres:0610@localhost:5432/red-badge");
     
     module.exports = sequelize;