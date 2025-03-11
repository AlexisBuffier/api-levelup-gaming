const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Cart = sequelize.define('Cart', {
  date_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'carts',
  timestamps: false
});

Cart.beforeUpdate((cart, options) => {
  cart.updatedAt = new Date();
});

// Relation avec User
User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Cart;