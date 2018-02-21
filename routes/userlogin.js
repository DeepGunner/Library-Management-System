const router = require('express').Router();

// let User = require('../models/user');

//user login
router.get('/uLogin/',function(req,res){
    res.render('uLogin')
})

router.post("/username", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password},  (err, user) => {
    if(err){
      console.log('error while logging..');
      // res.send("error while logging");
      return res.status(500).send('ERROR');
    }
    if(!user) {
      console.log("enter corrent username or password");
      return;
    }else {
      console.log("yea u successfully logged in");
      res.redirect("/");
    }

  })
})

// //user register
// router.get('/uLogin/uRegister/',function(req,res){
//     res.render('uRegister')
// })
//
// //user register post
// router.post('/uLogin/uRegister', function (req, res) {
//     let user = new User();
//     console.log(user);
//     user.username = req.body.username;
//     user.firstname = req.body.firstname;
//     user.lastname = req.body.lastname;
//     user.password = req.body.password;
//
//
//
//     user.save(function () {
//
//             res.redirect('/');
//
//     });
// });
//
module.exports = router;
