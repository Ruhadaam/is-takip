const express = require("express");
const router = express.Router();

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

module.exports = router;
