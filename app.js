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
        
        // Comment.findOne({ article_id: req.params.id }, function (err, comments) {
        //     console.log(comments);
        
            res.render('book', {
                book: book,
                
            });
        })
    });




//Start server
app.listen(3030, function () {
    console.log('Server running on port 3000');
})
