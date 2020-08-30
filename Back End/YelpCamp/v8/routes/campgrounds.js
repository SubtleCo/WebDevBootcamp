const express = require("express"),
	  router = express.Router();
      
const Campground = require("../models/campground")

// INDEX ROUTE
router.get("/", function(req,res){
	
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("error");
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
		};
	});
});

// NEW ROUTE
router.post("/", isLoggedIn, function(req,res){
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let newCampground = {name:name, image:image, description:description};
	// Create a new campground & save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds
			res.redirect("/campgrounds");
		};
	});
});

// CREATE ROUTE
router.get("/new", isLoggedIn, function(req,res){
		res.render("campgrounds/new");
});

// SHOW ROUTE - shows more info about one campground
router.get("/:id", (req,res) => {
	//find the campground using provided ID
	Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground:foundCampground})
		};
	});
	//render show template with that campground
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
