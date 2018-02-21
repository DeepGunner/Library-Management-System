const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

//init app
const app = express();

//link to db
mongoose.connect('mongodb://localhost/library');
let db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('Connected to MongoDb');
})

//set static
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//load models
let Book = require('./models/book');
let User = require('./models/user');
let Employee = require('./models/employee');

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//home
app.get('/', function (req, res) {
    Book.find({}, function (err, book) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
            book: book
            });
        }
    });
});

//book details view
app.get('/book/:id', function (req, res) {
    Book.findById(req.params.id, function (err, book) {

        // Comment.findOne({ user_id: req.params.id }, function (err, comments) {
        //     console.log(comments);

            res.render('book', {
                book: book,

            });
        })
    });

//user login
app.get('/uLogin/',function(req,res){
    res.render('uLogin')
})

app.post("/username", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password},  (err, user) => {
    if(err){
      console.log('error while logging..');
      res.send("error while logging");
      return;
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
//user register
app.get('/uLogin/uRegister/',function(req,res){
    res.render('uRegister')
})

//user register post
app.post('/uLogin/uRegister', function (req, res) {
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

//employee login
app.get('/eLogin/',function(req,res){
    res.render('eLogin')
})

//employee register
app.get('/eLogin/eRegister/',function(req,res){
    res.render('eRegister')
})


//employee register post
app.post('/eLogin/eRegister', function (req, res) {
    let employee = new Employee();
    employee.username = req.body.username;
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.password = req.body.password;



    employee.save(function () {

            res.redirect('/');

    });
});


//Start server
app.listen(3030, function () {
    console.log('Server running on port 3000');
})
