const { Sequelize } = require('sequelize');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: envFile });


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

module.exports = sequelize;
