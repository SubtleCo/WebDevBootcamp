const express = require("express");
const app = express();




// "/" => "Hi there!"
app.get("/", function(req, res){
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
	res.send("Goodbye!");
})

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
	console.log("Someone Made A Request To Dog");
	res.send("MEOW!");
})

app.get("/nah", function(req, res){
	console.log("Someone Made A Request To Nah, Brah");
	res.send("nah");
})

app.get("/custom/:thing", function(req, res){
	res.send("Welcome to the " + req.params.thing + " site!");
})

// using the "*" route matcher
app.get("*", function(req, res){
	res.send("You are a star!!!");
})


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server running")
});