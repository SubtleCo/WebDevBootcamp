const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  middleware = require("../middleware");
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// =========================
//     COMMENTS ROUTES
// =========================

router.get("/new", middleware.isLoggedIn, (req,res) => {
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
router.post("/", middleware.isLoggedIn, (req,res) => {
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
					req.flash("info", "Yeah, that's a really good point.");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
})

//Comments Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req,res) =>{
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error","No found campground.");
			return res.redirect("back")
		}
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err) {
				res.redirect("back");
			} else {
				res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// Comment Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req,res) =>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("info", "That IS a better way to say that. Nice catch.");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

//Comment DESTROY route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req,res) =>{
	Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

module.exports = router;