const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const aboutcontent = "Our mission is to nurture creativity, encourage introspection, and foster meaningful connections through the power of words. Whether you're an aspiring writer seeking to pen your first entry or a seasoned blogger looking for a fresh audience, we invite you to be a part of our thriving community. Together, we can build a tapestry of thoughts and ideas, weaving a collective narrative that celebrates the beauty of the human experience. So, join us on this enriching journey, where your voice finds its home, and together, let's create a vibrant tapestry of shared wisdom and inspiration.";
const contactconten = "We love hearing from our community! If you have any questions, suggestions, or simply want to say hello, don't hesitate to reach out to us. We're here to listen and connect. Thank you for being a part of our journey. Your presence makes this daily journal and blog website a warm and inviting space for everyone. Let's keep the conversations flowing and the creativity thriving!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home.ejs", {
    posts: []  // Empty array as a placeholder for posts
  });
});

app.get("/contact", function(req, res){
  res.render("contact.ejs", {Contactcontent: contactconten, aboutcontent: aboutcontent});
});

app.get("/compose", function(req, res){
  res.render("compose.ejs");
});

app.get("/blogs", function(req, res){
  res.render("blogs.ejs", {blogs: []});  // Empty array as a placeholder for blogs
});

app.post("/compose", function(req, res){
  res.redirect("/");
});

app.get("/blogs/:postId", function(req, res){
  res.render("post.ejs", {
    Posttitle: "Sample Title",  // Placeholder title
    PostContent: "Sample Content"  // Placeholder content
  });
});

app.post("/delete", function (req, res) {
  res.redirect("/blogs");
});

app.listen(3001, function(){
  console.log("Server started on port 3001.");
});
