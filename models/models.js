
const sequelize = require("../data/db");
const DataTypes = require("sequelize");
const Role = require("./role");
const Project = require("./projects");
const User = require('./users');
const Task = require('./tasks');





User.belongsTo(Role, { foreignKey: "roleId" });
Project.belongsTo(User, { foreignKey: 'createdById'});
Task.belongsTo(User, { foreignKey: 'createdById'});

async function createTables() {
    await Role.sync({ force: false });
    await User.sync({ force: false });
    await Project.sync({ alter: true });
    await Task.sync({ alter: true });
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

    // Örnek kullanıcılar oluştur


  
  // Örnek projeler oluştur
  await Project.create({
    name: 'Project 1',
    startDate: new Date(),
    endDate: new Date(),
    description: 'Description of Project 1',
    createdById: 1 // Oluşturan kullanıcının kimliğini uygun bir şekilde değiştirin
  });
  await Task.create({
    name: 'Task 1',
    description: 'Description of Task 1',
    status: 'Pending',
    priority: 'High',
    createdById: 1 // Oluşturan kullanıcının kimliğini uygun bir şekilde değiştirin
  });
 
  
  // Örnek görevler oluştur
 
  

  
  console.log('Örnek veriler başarıyla eklendi.');
  
  
  
  
  }
try {
    createTables();
    createData();
} catch (error) {
    console.log(error);
}
 

  