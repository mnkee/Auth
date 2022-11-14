import Users from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateAuth = async (req, res, next) => {
  try{
    const token = req.cookies['token'];
    if(!token){
      console.log("gada")
      res.redirect("/login");
    }

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if(err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
  });
  }
  catch (error) {
        console.log(error.message);
    };
};