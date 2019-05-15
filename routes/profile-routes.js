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


   // bug - req.user: mongoDB _id
   res.send(`You are logged in. This is your profile: ${req.user.username}`);
}) 

module.exports = router;