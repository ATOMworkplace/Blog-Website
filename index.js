const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/Blogdb", { useNewUrlParser: true, useUnifiedTopology: true });

const PostSchema = new mongoose.Schema({
  title: String,
  content: String
});

let blogpost;
if (mongoose.modelNames().includes('Blogdb')) {
  blogpost = mongoose.model('Blogdb');
} else {
  blogpost = mongoose.model('Blogdb', PostSchema);
}

const aboutcontent = "Our mission is to nurture creativity, encourage introspection, and foster meaningful connections through the power of words. Whether you're an aspiring writer seeking to pen your first entry or a seasoned blogger looking for a fresh audience, we invite you to be a part of our thriving community. Together, we can build a tapestry of thoughts and ideas, weaving a collective narrative that celebrates the beauty of the human experience. So, join us on this enriching journey, where your voice finds its home, and together, let's create a vibrant tapestry of shared wisdom and inspiration.";
const contactcontent = "We love hearing from our community! If you have any questions, suggestions, or simply want to say hello, don't hesitate to reach out to us. We're here to listen and connect. Thank you for being a part of our journey. Your presence makes this daily journal and blog website a warm and inviting space for everyone. Let's keep the conversations flowing and the creativity thriving!";

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  blogpost.find().then(function(posts) {
    res.render("home.ejs", {
      posts: posts
    });
  });
});

app.get("/contact", function(req, res) {
  res.render("contact.ejs", { Contactcontent: contactcontent, aboutcontent: aboutcontent });
});

app.get("/compose", function(req, res) {
  res.render("compose.ejs");
});

app.get("/blogs", function(req, res) {
  blogpost.find().then(function(posts) {
    res.render("blogs.ejs", { blogs: posts });
  });
});

app.post("/compose", function(req, res) {
  const posts = new blogpost({
    title: req.body.Title_text,
    content: req.body.compose_text
  });
  posts.save().then(function() {
    res.redirect("/");
  });
});

app.get("/blogs/:postId", function(req, res) {
  const requestedPostId = req.params.postId;
  blogpost.findOne({ _id: requestedPostId }).then(function(post) {
    res.render("post.ejs", {
      Posttitle: post.title,
      PostContent: post.content
    });
  });
});

app.post("/delete", function(req, res) {
  const value1 = req.body.del_btn_1;
  blogpost.findByIdAndRemove(value1).then(function(removedtask) {
    res.redirect("/blogs");
  });
});

app.listen(3000, function() {
  console.log("Server started.");
});
