
const router = require("express").Router();




const authCheck = (req, res, next) => {
   if(!req.user){
      console.log('you are not logged in!!!');
       res.redirect('/auth/login');
   } else {
      
       next();
   }
};

router.get("/", authCheck, (req, res) => {

   // test
   console.log(`AFTER REDIRECT...`);
   console.log(`req.user: ${req.user}`);


   
   // res.send(`You are logged in. Your username is: ${req.user.username}`);

   res.render("profile", {
      loggedIn: true,
      helpers: {
         username: req.user.username
      }
   })
}) 

// overview of gardens.. 
router.get("/gardens", (req, res) => {
   
   res.render("gardens", {
      loggedIn: true,
      helpers: {
         username: req.user.username
      }
   })
})



module.exports = router;