//db bilgilerini almak için
const sequelize = require("../data/db");

//sequelize fonksiyonlarını çalıştırmak için
const DataTypes = require("sequelize");

const Role = require("./role");

//user tablosunu oluşturmak için
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM(
      "Male",
      "Female",
      "Non-Binary",
      "Other",
      "I don't want to specify."
    ),
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });

async function createTables() {
  await Role.sync({ alter: true });
  await User.sync({ alter: true });
}

async function createData() {
  // Role tablosunu kontrol ederek admin rolünü ekleyin
  const adminRole = await Role.findOne({ where: { name: "admin" } });
  if (!adminRole) {
    User.create({
      firstName: "Ruh",
      lastName: "Adam",
      email: "admin@gmail.com",
      password: "123",
      gender: "Male",
      birthDate: "1990-01-01",
      roleId: 1,
    });
  }
  const userRole = await Role.findOne({ where: { name: "user" } });
  if (!userRole) {
    Role.create({
      name: "user",
    });
  }
}

createTables();
createData();

module.exports = User;
