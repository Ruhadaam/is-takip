//db bilgilerini almak için
const sequelize = require('../data/db');

//sequelize fonksiyonlarını çalıştırmak için
const DataTypes = require('sequelize');

const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  module.exports = Role;
