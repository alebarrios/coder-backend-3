async function loginUser(req, res) {
    try {
        if (req.isUnauthenticated()){
            res.status(200)
            .render("login", {
                layout : 'index',
                style: 'index.css',
                js: 'login.js',
                title: "Login",
                });
        } else {
            res.redirect('/products');
        }
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

async function registerUser(req, res) {
    try {
        if (req.isUnauthenticated()){
        res.status(200)
        .render("register", {
            layout : 'index',
            style: 'index.css',
            js: 'register.js',
            title: "Register",
            });
        } else {
            res.redirect('/products');
        }
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

async function passportRegistered(req, res) {
        res.redirect("/login");
}

async function failRegister(req, res) {
    res.redirect("/register");
};

async function passportLogged(req, res) {
        res.redirect("/products");
}

async function failLogin(req, res) {
    res.redirect("/login");
};

async function logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
};

async function rootRedirect(req, res) {
    try {
        res.redirect('/login');
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
};

export default
{loginUser,
registerUser,
passportRegistered,
failRegister,
passportLogged,
failLogin,
logout,
rootRedirect,
}