const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

let friends = ["tony", "buddy", "pierre", "Johnny"];

app.get("/", function(req,res){
	res.render("home");
})

app.get("/friends", function(req,res){
	res.render("friends", {friends: friends});
})

app.post("/addfriend", function(req,res){
	let newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server started on port 3000");
})