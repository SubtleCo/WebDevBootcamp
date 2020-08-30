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
			return res.render("register");	
		}
		passport.authenticate("local")(req, res, function(){
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
	res.redirect("/campgrounds");
})

// isLoggedIn middleware

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;