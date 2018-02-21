const router = require('express').Router();
let User = require('../models/user');

//user register
router.get('/uLogin/uRegister/',function(req,res){
    res.render('uRegister')
})

//user register post
router.post('/uLogin/uRegister', function (req, res) {
    let user = new User();
    console.log(user);
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = req.body.password;



    user.save(function () {

            res.redirect('/');

    });
});

module.exports = router;
