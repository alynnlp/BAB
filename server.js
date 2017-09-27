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

//**********************************************GET******************************************************//
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//users own page
app.get("/users/:userid",(req, res)=>{
  res.render("");
})

//account settings
app.get("/users/:userid/settings", (req,res)=>{
  res.render("");
})

//Discover
app.get("/discover", (req,res)=>{
  res.render("");
})

//create - categorizing saved pins
app.get("/users/:userid/:topic", (req,res)=>{
  res.render("");
})

//Resource
app.get("/resources/:resourceid",(req,res)=>{
  res.render("");
})


//**********************************************POST******************************************************//


//Home - Logged In
app.post("/", (req, res)=>{
  res.redirect("");
})

//Delete - users pins/ownpage
// /users/:userid/ - just user pins (GET, DELETE)
app.post("/users/:userid", (req,res)=>{
  res.redirect("");
})

//Update(PUT) users existing information
app.post("/users/:userid/settings", (req,res)=>{
  res.redirect("");
})

//Register
app.post("/register", (req,res)=>{
  res.redirect("");
})

//Login
app.post("/login",(req,res)=>{
  res.redirect("");
})

//Logout
app.post("/logout",(req,res)=>{
  res.redirect("");
})

//Resource - updating comment
app.post("urls/", (req,res)=>{
  res.redirect("");
})

//Resource - delete comment
app.post("/resources/:resourceid", (req,res)=>{
  res.redirect("");
})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
