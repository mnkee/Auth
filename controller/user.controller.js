import Users from "../models/User.model.js";

export const index = async (req, res) => {
  try {
    const token = req.cookies['token'];
    const data = await Users.findAll();

    data.forEach( user => {
      if(user.token == token){
          res.render("index", { title: "Home", user: user });
      };
    });
  }
  catch(error) {
    console.log(error.message);
    res.redirect("/login");
  };
};

export const register = async (req, res) => {
  // check token
  req.session.ikan = 'ikan goreng'
  req.session.save()
  
  // const tokenClient = req.cookies['token'];
  // if(tokenClient){
  //     return res.redirect('/');
  // };

  res.render("register", { 
      title: "Register",
      status: req.flash("status"),
      message: req.flash("message")
   });
}

export const login = async (req, res) => {
  //check token
  console.log(req.session.ikan)
  // const tokenClient = req.cookies['token'];
  // if(tokenClient){
  //     return res.redirect('/');
  // };

  res.render("login", { 
      title: "Login",
      status: req.flash("status"),
      message: req.flash("message")
  });
}