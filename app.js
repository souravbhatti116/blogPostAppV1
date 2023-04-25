// jshint esversion:6

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const date = require(__dirname + '/date.js');
const _ = require('lodash');
const mongoose = require('mongoose');
// const posts = [];
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
///
const pass = "Atlas100RavB116"
mongoose.connect(`mongodb+srv://souravbhatti116:${pass}@mongodbsourav.827m2ne.mongodb.net/?retryWrites=true&w=majority`);             // selection of the db.
// mongoose.connect("mongodb://localhost:27017/todoListDB");             // selection of the db.

const postSchema = {
    date: String,
    title: String,
    post: String,
}

const Post = mongoose.model('POST', postSchema)
//////////////////////////////////

app.get('/', (req, res) => {
    // res.render('home', {user:'Sourav', content:posts});
    Post.find()
    .then((posts) =>{
        res.render('home', {user:'Sourav', content:posts} )
    })
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
  
    // let post = {
    //     date: date.getDate(),
    //     title: req.body.title,
    //     post: req.body.body,
    // }
    

    // posts.push(post);

    let dbPost = new Post({

        date: date.getDate(),
        title: req.body.title,
        post: req.body.body,

    })
    dbPost.save();
    res.redirect('/');

} )

app.get('/posts/:postTitle', (req, res) => {
    
    const title = req.params.postTitle;
    console.log(title);
    Post.findOne({title: title})
    .then((post) =>{
        res.render('posts',{user:"Sourav", content:post} )
    })

    // posts.forEach((post) => {                               
    //     const storedTitle = _.lowerCase(post.title);
    //     if (storedTitle === title) {
    //         res.render('posts', {title: post.title, body: post.body, date:post.date})
    //     }
    // });
})

app.listen(port, () => console.log("Server Online at port 3000."))


