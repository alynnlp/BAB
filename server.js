"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//******************************************DATA***************************************************//
// const users = {
//   "userID": {
//     first-name: "John"
//     last-name: "Cox"
//     username: "abd",
//     email: "user@example.com",
//     password: "purple-monkey-dinosaur"
//   },







//******************************************FUNCTION***************************************************//
function generateRandomUsersId() {
  var usersRandomId = "" ;
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6; i++)
    usersRandomId += possible.charAt(Math.floor(Math.random() * possible.length));
  return usersRandomId;
}
function checkforEmail(emailToCheck){
    for(user in users){
      if(users[user].email === emailToCheck){
        return true;
      }
    }
    return false;
}
function checkforUsername(usernameToCheck){
  for(user in users){
    if(users[user].username === usernameToCheck){
      return true;
    }
  }
  return false;
}
function checkforPassword(passwordToCheck){
  for (user in users){
    if(users[user].password === passwordToCheck){
      return true;
    }
  }
  return false;
}




//**********************************************GET******************************************************//
// Home page -  is it necessary to add URL/?
app.get("/", (req, res) => {

  res.render("index");
});

//users own page with liked sources and saved pins(customized topic)
app.get("/users/:userid",(req, res)=>{

  res.render("user");
})

//account settings to update profile
app.get("/users/:userid/settings", (req,res)=>{

  res.render("account-settings");
})

//*** filtered user own page
app.get("/users/:userid/:topic", (req,res)=>{

  res.render("topics");
})

//before login, Topic to browser after clicking the Discover Button
app.get("/topic", (req,res)=>{

  res.render("topics");
})

app.get("/topic/:topic", (req,res)=>{

  res.render("/");
})

//categorizing saved pins by adding new resources to customized topic
app.get("/new", (req,res)=>{
  //
  res.render("add-resource");
})

//Resource page to show clicked individual page and comments
app.get("/resources/:resourceid",(req,res)=>{

  res.render("resource");
})


//**********************************************POST******************************************************//


//Home - Logged In
app.post("/", (req, res)=>{

  //once logged in from home page, redirect to user page
  res.redirect("user");
})

//Delete - users pins/ownpage
app.post("/users/:userid", (req,res)=>{

  //delete saved pins
  res.redirect("user");
})

//Account-Setting - Update(PUT) users existing information
app.post("/users/:userid/settings", (req,res)=>{

  //page with updated info
  res.redirect("account-settings");
})

//Register
app.post("/register", (req,res)=>{
  //condition to register after posting

  //if success redirect to homepage
  res.redirect("/users/:userid");
})

//Login
app.post("/login",(req,res)=>{
  //condition to login

  //if success redirect to user OWN page
  res.redirect("/users/:userid");
})

//Logout
app.post("/logout",(req,res)=>{

  //from user's page to homepage
  res.redirect("/");
})

//adding to user's
app.post("/users/:userid/adding",(req,res)=>{
  //add more pin alert
  res.redirect("resource");
})

//Resource - updating comment
app.post("/resource/:resourceid", (req,res)=>{

  //same page with CREATED comment
  res.redirect("resource");
})

//Resource - DELETE comment
app.post("/resources/:resourceid", (req,res)=>{

  //delete user created comment
  res.redirect("resource");
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
