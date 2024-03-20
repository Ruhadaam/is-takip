const express = require("express");
const router = require("./routes/router");
const db = require("./data/db");
const path = require("path");
const user = require("./models/users");
const bodyParser = require("body-parser");
const session = require("express-session");



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// express-session middleware'ini kullanarak session'ları yapılandırın
app.use(session({
  secret: 'your-secret-key', 
  resave: false, 
  saveUninitialized: false 
}));


app.set("view engine", "ejs");
app.use(router);

app.use("/css", express.static(path.join(__dirname, "assets", "css")));
app.use("/img", express.static(path.join(__dirname, "assets", "img")));
app.use("/flowbite",express.static(path.join(__dirname, "node_modules", "flowbite")));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
