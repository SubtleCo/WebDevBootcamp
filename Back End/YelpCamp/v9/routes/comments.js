const express = require("express"),
	  router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// =========================
//     COMMENTS ROUTES
// =========================

router.get("/new", isLoggedIn, (req,res) => {
	//FInd campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
})

// Comments Create
router.post("/", isLoggedIn, (req,res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			res.redirect("/campground");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and ID to comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	// create new comment
	// connect new comment to campground
	// redirect to campground show page
	
})


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;