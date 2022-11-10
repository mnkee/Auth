import express from "express";
import db from "./models/index.js";
import Users from "./models/User.model.js";
import router from "./route/route.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
const app = express();

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
      sameSite: true,
      maxAge: 60000
  }
}));

app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try{
  await db.authenticate()
  console.log("database Connected...")
  await Users.sync()
}
catch (error) {
  console.log(error.message)
}

app.use(router)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
});