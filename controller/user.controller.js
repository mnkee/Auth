export const index = async (req, res) => {
  try {

    const name = await req.name;
    name ? res.render("index", { title: "Home", name: name }) : res.render("index", { title: "Home", name: "Yh di bobol heker :( " });
  }
  catch(error) {
    console.log(error.message);
    res.redirect("/login");
  };
};

export const register = async (req, res) => {
  const isAuth = req.session.auth || req.cookies["auth"];
  if(isAuth){
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
  const isAuth = req.session.auth || req.cookies["auth"];
  if(isAuth){
      return res.redirect('/');
  };

  res.render("login", { 
      title: "Login",
      status: req.flash("status"),
      message: req.flash("message")
  });
}