const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get('/api/logout', (req, res) => {
    req.logout(); // kills the cookie
    res.send(req.user);
  })

  app.get('/api/current-user', (req, res) => {
      res.send(req.session)
      // console.log(req.user);
      // res.send(req.user);
  })
};


