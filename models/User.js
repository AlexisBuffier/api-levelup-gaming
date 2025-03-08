const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'users',
});

module.exports = User;
