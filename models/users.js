
//db bilgilerini almak için
const sequelize = require('../data/db');

//sequelize fonksiyonlarını çalıştırmak için
const DataTypes = require('sequelize');

//user tablosunu oluşturmak için
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Non-Binary', 'Other', 'I don\'t want to specify.'),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  });

  


async function sync() {
  await User.sync();
  console.log("User table synchronized.");
}
sync();

  module.exports = User;