const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'products',
});

// Relation avec Category
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;
