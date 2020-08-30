const express = require("express")
const app = express();
const axios = require("axios")
app.set("view engine", "ejs");


app.get("/", function(req,res){
	res.render("search")
})

app.get("/results", (req,res) =>{
	let query = req.query.search
	axios.get(`http://omdbapi.com/?s=${query}&apikey=thewdb`)
		.then((response) =>{
			let data = (response.data);
			res.render("results", {data: data});
		})
		.catch(function(error){
			console.log(error);
		})
		.finally(function(){})
});


app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Movie App running on port 3000")
});
