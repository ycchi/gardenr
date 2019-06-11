const router = require("express").Router(); 
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
    res.render('login')
})

// auth log out google
router.get("/logout", async (req, res) => {
   // handle with passport
   //  req.logout();
   //  req.session = null
   //  res.redirect("/")
   
    await req.logout()
    req.session = null
    req.sessionOptions.maxAge = 0
    return res.redirect('http://localhost:3000/')
    
})


// auth with google
router.get("/google", passport.authenticate("google", {
   scope: ["profile"]
}))

// call back routes for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
   
   // res.send(`you reached callback uri`) 
   // res.send(req.user)  
   console.log(`BEFORE REDIRECT...`);
   console.log(`req.user.username: ${req.user.username}`)
   res.redirect("http://localhost:3000/garden/")
})


module.exports = router;