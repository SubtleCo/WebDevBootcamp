const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  User = require("../models/user");


// Root Route
router.get("/", function(req,res){
	res.render("landing")
});

// show register form
router.get("/register", (req,res) =>{
	res.render("register");
})

// handle sign up logic
router.post("/register", (req,res) =>{
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password,(err,user)=>{
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");	
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Hey, welcome to the party " + user.username + "!");
			res.redirect("/campgrounds");
		})
	})
})

// Show login form
router.get("/login", (req,res) =>{
	res.render("login");
})

// Login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), (req,res) =>{});

// logout route

router.get("/logout", (req,res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
})

module.exports = router;