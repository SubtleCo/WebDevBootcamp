const express = require("express"),
	  router = express.Router(),
	  middleware = require("../middleware")
      
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

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let price = req.body.price;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {name:name, image:image, price:price, description:description, author:author};
	// Create a new campground & save to database
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds
			req.flash("info", "Ooh la la, what a fancy new post. We're gonna save it.")
			res.redirect("/campgrounds");
		};
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
		res.render("campgrounds/new");
});

// SHOW ROUTE - shows more info about one campground
router.get("/:id", (req,res) => {
	//find the campground using provided ID
	Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			res.redirect("back");
		} else {
			res.render("campgrounds/show", {campground:foundCampground})
		};
	});
	//render show template with that campground
})

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res) => {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground})
	})
	
})
//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req,res) => {
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/");
		} else {
			req.flash("info", "Those changes make a lot of sense. Good call.")
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
		// redirect to edited page
})

// DESTORY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, (req,res) => {
	Campground.findByIdAndRemove(req.params.id, (err) =>{
		if(err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;
