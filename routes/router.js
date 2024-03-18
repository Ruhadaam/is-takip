const express = require("express");
const router = express.Router();
const User = require("../models/users");
//GET START

router.get("/", (req, res) => {
  const data = {
    value: "./template/content",
    title: "Dashboard",
  };

  res.render("index", data);
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  const data = {
    value: "./pages/dashboard",
    title: "Dashboard",
  };

  res.render("index", data);
});

router.get("/tasks", (req, res) => {
  const data = {
    value: "./pages/tasks",
    title: "Tasks",
  };

  res.render("index", data);
});

router.get("/users", (req, res) => {
  const data = {
    value: "./pages/users",

    title: "Users",
  };

  res.render("index", data);
});

router.get("/profile", (req, res) => {
  const data = {
    value: "./pages/profile",
    title: "Profile",
  };

  res.render("index", data);
});

//GET END

//POST START

router.post("/register", async (req, res) => {
  try {
    const {
      firstNameRegister,
      lastNameRegister,
      emailRegister,
      passwordRegister,
      genderRegister,
      birthDateRegister,
    } = req.body;

    const existingUser = await User.findOne({
      where: { email: emailRegister },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu e-posta adresi zaten kullanımda" });
    }
    const newUser = await User.create({
      firstName: firstNameRegister,
      lastName: lastNameRegister,
      email: emailRegister,
      password: passwordRegister,
      gender: genderRegister,
      birthDate: birthDateRegister,
    });

    res.status(201).json(newUser); // Başarı durumunda oluşturulan kullanıcıyı yanıt olarak gönderin
  } catch (error) {
    console.error("Kullanıcı oluşturulurken bir hata oluştu:", error);
    res.status(500).json({ error: "Kullanıcı oluşturulurken bir hata oluştu" }); // Hata durumunda uygun bir yanıt gönderin
  }
});

module.exports = router;
