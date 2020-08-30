const Campground = require("../models/campground"),
	  Comment = require("../models/comment");

// All middleware goes here
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err || !foundCampground) {
				req.flash("error","Campground not found");
				res.redirect("/campgrounds");
			} else {
				//does user own campground?				
				if(foundCampground.author.id.equals(req.user._id)) {
					next();					
				} else {
					req.flash("error","Whoa, bud, hands off. Just because you know HTML doesn't mean this is yours to change.")
					res.redirect("back");
				}
			}
		})
	} else {
		req.flash("error", "You sneaky bastard. Log in first.")
		res.redirect("back");
	}
};


middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err || !foundComment) {
				req.flash("error","Comment not found")
				res.redirect("back");
			} else {
				//does user own comment?				
				if(foundComment.author.id.equals(req.user._id)) {
					next();					
				} else {
					res.redirect("back");
				}
			}
		})
	} else {
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first.");
	res.redirect("/login");
};
module.exports = middlewareObj 