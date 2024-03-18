const express = require("express");
const router = express.Router();
const User = require("../models/users");


//session yoksa login sayfasına yönlendiren middleware
const checkSession = (req, res, next) => {
  if (req.session && req.session.user) {
   
    next(); 
  } else {
   
    res.redirect('/login'); 
  }
};

//GET START
router.get("/", checkSession, (req, res) => {

  
  const data = {
    value: "./template/content",
    title: "Dashboard",
  };

  res.render("index", data);
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Oturum silinirken bir hata oluştu:', err);
      res.status(500).send('Oturum silinirken bir hata oluştu');
    } else {
      res.redirect('/login');
    }
  });
});


router.get("/login", (req, res) => {
   // Eğer oturum zaten varsa, direkt olarak ana sayfaya yönlendir
   if (req.session.user) {
    return res.redirect('/');
  }
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


router.post("/login", async (req, res) => {
  try {
   

    const { emailLogin, passwordLogin } = req.body;

    const user = await User.findOne({ where: { email: emailLogin } });

    if (!user || user.password !== passwordLogin) {
      res.status(401).send('Kullanıcı adı veya şifre yanlış');
    } else {
      // Oturum oluştur
      req.session.user = user; 
      res.redirect('/');
    }

  } catch (error) {
    console.error("Giriş yapmaya çalışırken bir hatayla karşılaşıldı:", error);
    res.status(500).json({ error: "Giriş yapmaya çalışırken bir hatayla karşılaşıldı" }); }
});





module.exports = router;
