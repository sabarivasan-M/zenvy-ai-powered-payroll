const { Sequelize } = require('sequelize');
const path = require('path');

// Use SQLite for this environment
const storagePath = path.join(__dirname, '../../zenvy.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false // Toggle to true to see SQL queries
});

module.exports = sequelize;
