const router = require("express").Router();

let Employee = require('../models/employee');

router.get('/eLogin/',function(req,res){
    res.render('eLogin')
})

//employee register
router.get('/eLogin/eRegister/',function(req,res){
    res.render('eRegister')
})


//employee register post
router.post('/eLogin/eRegister', function (req, res) {
    let employee = new Employee();
    employee.username = req.body.username;
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.password = req.body.password;



    employee.save(function () {

            res.redirect('/');

    });
});

module.exports = router;
