const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("home")
});

app.get("/fallinlovewith/:thing", function(req,res)	{
	let thing = req.params.thing;
	res.render("love",{thingVar: thing});
})

app.get("/posts", function(req,res){
	let posts = [
		{title: "Post 1", author: "Susy"},
		{title: "My Butt", author: "Monkey"},
		{title: "Why your butt?", author: "Boomer"},
		];
	
	res.render("posts", {posts: posts});
	
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Servier is listening on port 3000.")
});
