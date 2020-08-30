const express = require('express');
const app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment surgery!")
})

app.get("/speak/pig", function(req, res){
	res.send("Oink")
})

app.get("/speak/cow", function(req, res){
	res.send("Moo")
})

app.get("/speak/dog", function(req, res){
	res.send("Double Woof")
})

app.get("/repeat/:word/:num", function(req, res){
	let string = req.params.word;
	let build = "";
	for (let i = 0; i < req.params.num; i++){
		build += " " + string
	}
	res.send(build);
})

app.get("*", function(req, res){
	res.send("Not a page, dummo")
})

app.listen(process.env.PORT || 3000, process.env.IP)

console.log("Server running on port 3000")