const express = require("express"),
	  app = express();

app.set("view engine","ejs");

app.get("/", (req,res) => {
	res.render("home");
})

app.get("/about", (req,res) => {
	res.render("about");
})

app.listen(process.env.PORT||3000, process.env.IP, () => {
	console.log("nice")
})