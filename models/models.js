
const Role = require("./role");
const Project = require("./projects");
const User = require("./users");
const Task = require("./tasks");



User.belongsTo(Role, { foreignKey: "roleId" });
Project.belongsTo(User, { foreignKey: "createdById" });
Task.belongsTo(User, { foreignKey: "createdById" });

Task.belongsTo(Project, {foreignKey:"projectId"});

/*
Task.hasMany(User);

*/




async function createTables() {
  await Role.sync({ force: true });
  await User.sync({ force: true });
  await Project.sync({ force: true });
  await Task.sync({ force: true });

  async function createAdmin() {
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole) {
      Role.create({
        name: "admin",
      });
    }

    const adminUser = await User.findOne({where: {email:"admin@gmail.com"}});
    if (!adminUser) {
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
  }

  createAdmin();

 

  const userRole = await Role.findOne({ where: { name: "user" } });
  if (!userRole) {
    Role.create({
      name: "user",
    });
  }
}

async function createData() {
  await Project.create({
    name: "Project 1",
    startDate: new Date(),
    endDate: new Date(),  
    createdById: 15, // Oluşturan kullanıcının kimliğini uygun bir şekilde değiştirin
  });
  
  await Task.create({
    name: "Task 1",
    status: "Pending",
    priority: "High",
    createdById: 15,
    projectId: 14,
    userId:15, // Oluşturan kullanıcının kimliğini uygun bir şekilde değiştirin
  });
 

  // Örnek görevler oluştur

  console.log("Örnek veriler başarıyla eklendi.");
}
try {
  createTables();
 
  
} catch (error) {
  console.log(error);
}
