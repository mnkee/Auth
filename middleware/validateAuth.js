import Users from "../models/User.model.js";

export const validateAuth = async (req, res, next) => {
  try{
      req.session.login ? next() : res.redirect("/login");
    }
  catch (error) {
        console.log(error.message);
    };
};