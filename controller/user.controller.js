import Users from "../models/User.model.js";

export const index = async (req, res) => {
  try {
    // const token = req.cookies['token'];
    const user = await Users.findOne({ where: {id: req.session.login} });

    user ? res.render("index", { title: "Home", user: user }) : res.render("index", { title: "Home", user: "User tidak ditemukan " });
  }
  catch(error) {
    console.log(error.message);
    res.redirect("/login");
  };
};

export const register = async (req, res) => {
  // check token
  // const tokenClient = req.cookies['token'];
  if(req.session.login){
      return res.redirect('/');
  };

  res.render("register", { 
      title: "Register",
      status: req.flash("status"),
      message: req.flash("message")
   });
}

export const login = async (req, res) => {
  //check token
  const tokenClient = req.cookies['token'];
  if(req.session.login){
      return res.redirect('/');
  };

  res.render("login", { 
      title: "Login",
      status: req.flash("status"),
      message: req.flash("message")
  });
}