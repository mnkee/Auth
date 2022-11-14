import Users from "../models/User.model.js";
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res) => {
    try {
      // get data
      const tokenClient = req.cookies['token'];
      const { name, email, password, confirmPassword } = req.body;
      
      if(tokenClient){
        return res.redirect('/');
      };
      
      // validation
      if(password !== confirmPassword){
        req.flash("status", "danger");
        req.flash("message", "Password does't match");
        return res.redirect("/register")
      };
      
      const usersDB = await Users.findOne({ where : {email: email} });
      if(usersDB){
        req.flash("status", "danger");
        req.flash("message", "Email has used");
        return res.redirect("/register")
      }
      // push data to database
      await Users.create({
        name: name,
        email: email,
        password: password,
        token: null
      });
      
      // send respone
      req.flash("status", "success");
      req.flash("message", "Register successfully");
      res.redirect("/login");
    }
    catch (error) {
      console.log(error.message);
      req.flash("status", "danger");
      req.flash("message", "Register Failed");
      res.redirect('/register');
    };
  };
  
  export const auth = async (req, res) => {
    try{

      // get data
      const { email, password } = req.body;

      // validation
      const user = await Users.findOne({ where: { email: email} });
      
      if(!user){
        req.flash("status", "danger");
        req.flash("message", `this email is not registered`);
        return res.redirect("/login");
      };
       
      if(user.password !== password){
        req.flash("status", "danger");
        req.flash("message", "password was incorect");
        return res.redirect("/login");
      };

      req.session.auth = user.id;      
      res.redirect("/");
    }
    catch (error) {
      console.log(error.message);
      req.flash("status", "danger");
      req.flash("message", "Login Failed");
      res.redirect("/login");
    };
  };
  
  export const logOut = async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};