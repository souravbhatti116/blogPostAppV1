// jshint esversion::6

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const date = require(__dirname + '/date.js');
const _ = require('lodash');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const posts = [];

app.get('/', (req, res) => {
    res.render('home', {user:'Sourav', content:posts});
    
});

app.get('/about', (req,res) => {
    res.render('about');
})

app.get('/contact', (req,res) => {
    res.render('contact');
})

app.get('/compose', (req, res) => {
    res.render('compose')
})
app.post('/compose',(req,res) => {
  
    let post = {
        date: date.getDate(),
        title: req.body.title,
        body: req.body.body,
    }
    
    posts.push(post);
    res.redirect('/')
} )

app.get('/posts/:postTitle', (req, res) => {
    
    const title = _.lowerCase(req.params.postTitle);
    posts.forEach((post) => {                               
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === title) {
            res.render('posts', {title: post.title, body: post.body, date:post.date})
        }
    });
})

app.listen(port, () => console.log("Server Online at port 3000."))
