const Sequelize = require('sequelize');

const sequelize = new Sequelize('webshop', 'root', 'qwerty', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;