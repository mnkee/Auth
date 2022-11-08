import Users from "../models/User.model.js";

export const validateToken = async (req, res, next) => {
  try{
      const token = req.cookies['token'];
      let accessToken = '';
      
      // Check Token  
      if(!token){
        return res.redirect("/login");
      };

      // Get Access Token
      const response = await Users.findAll();
      response.forEach( user => {
          if(user.token === token){
            accessToken = user.token;
          };
      });

      // Validate Token
      if(!accessToken){
        return res.redirect("/login");
      };

      console.log(req.session);

      next();
    }
  catch (error) {
        console.log(error.message);
    };
};