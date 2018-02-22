const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
// const bcrypt = require('bcrypt');

//init app
const app = express();


//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

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

//user register
app.get('/uLogin/uRegister/',function(req,res){
    res.render('uRegister')
})
var currentUser
//ulogin auth
app.post("/uLogin", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    currentUser = username;
    User.findOne({username: username, password: password},  (err, user) => {
      if(err){
        console.log('error while logging..');
        res.send("error while logging");
        return;
      }
      if(!user) {
        console.log("incorrect username or password");
        return;
      }else {
        console.log("user logged in");
        res.redirect("uIndex");
      }

    })
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
var currentEmp;
//elogin auth
app.post("/eLogin", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    currentEmp = username;
    Employee.findOne({username: username, password: password},  (err, employee) => {
      if(err){
        console.log('error while logging..');
        res.send("error while logging");
        return;
      }
      if(!employee) {
        console.log("incorrect username or password");
        return;
      }else {
        console.log("Employee logged in");
        res.redirect("/eIndex");
      }

    })
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

//user homepage
app.get('/uIndex', function (req, res) {
    console.log(currentUser);
    Book.find( function (err, book) {
    User.findOne({"username":currentUser}, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.render('uIndex', {
            book: book,
            user: user
                });
            }
        })
    });
 });

//employee homepage
 app.get('/eIndex', function (req, res) {
    console.log(currentEmp);
    Book.find( function (err, book) {
    Employee.findOne({"username":currentEmp}, function (err, employee) {
        if (err) {
            console.log(err);
        } else {
            res.render('eIndex', {
            book: book,
            employee: employee
                });
            }
        })
    });
 });


//manage books
app.get('/eIndex/manage', function (req, res){
    res.render('manage');
})

//add book
app.get('/eIndex/manage/add', function (req, res){
    res.render('addBook');
})

//add book post
app.post("/addBook", function(req, res) {
    let newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.type = req.body.type;
    newBook.img = "/img/"+ req.body.img;
    console.log(req.body.img);
    newBook.save( function() {
        res.redirect('/');
    })
})

//update book
app.get('/eIndex/manage/update', function (req, res){
    res.render('updateBook');
})

//delete
app.get('/eIndex/manage/delete', function (req, res){
    res.render('deleteBook');
})
//Start server
app.listen(3030, function () {
    console.log('Server running on port 3000')
})
