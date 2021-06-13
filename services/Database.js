const Sequelize = require('sequelize');
const config = require('../config.js');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, config.database.config);
}

module.exports = sequelize;