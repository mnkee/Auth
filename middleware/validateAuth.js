import Users from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();

export const validateAuth = async (req, res, next) => {
  try{
    const isAuth = req.session.auth;

    if(isAuth){
      const user = await Users.findOne({ where: {id: isAuth} });
      req.name = user.name;
      
      return next();
    };

    res.redirect("/login");
  }
  catch (error) {
        console.log(error.message);
    };
};