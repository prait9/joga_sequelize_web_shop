const path = require('path');
const fs = require('fs');
const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');

const models = {};

module.exports = (() => {
  if (!Object.keys(models).length) {
    const files = fs.readdirSync(__dirname);
    const excludedFiles = ['.', '..', 'index.js'];

    for (const fileName of files) {
      if (!excludedFiles.includes(fileName) && path.extname(fileName) === '.js') {
        const modelDefiner = require(path.join(__dirname, fileName));

        const model = modelDefiner(sequelize, DataTypes);

        models[model.name] = model;
      }
    }

    Object
      .values(models)
      .forEach(model => {
        if (typeof model.associate === 'function') {
          model.associate(models);
        }
      });

    models.sequelize = sequelize;
  }

  return models;
})();
