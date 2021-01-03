const router = require("express").Router();
const passport = require("passport");
const cors = require("cors");
const frontURL = process.env.FRONTEND_URL

router.get("/", cors({origin: [frontURL, 'http://62.77.159.128:3001'], credentials: true}), async(req, res) => {
  if(req.isAuthenticated()) {
    return res.json(req.user)
  } else {
    res.json({
      msg: "Unauthorized",
      logged: req.isAuthenticated()
    })
  }
})

router.get("/logout", cors({origin: [frontURL, 'http://62.77.159.128:3001'], credentials: true}), async function(req, res) {
  await req.logout();
  res.redirect(`${frontURL}/`)
})

router.get("/login", passport.authenticate("discord", { failureRedirect: "/login" }))
router.get("/login/callback", passport.authenticate("discord", { failureRedirect: "/login" }), async (req, res) => {
  res.redirect(`${frontURL}/`)
})

module.exports = router;