const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "doobie deee blah"
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1583872922377-88058309c346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "doobie deee blah"
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1521404115841-baa52edcb041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "doobie deee blah"
	},
];

function seedDB(){
	// Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err)
		}
		console.log("Removed all campgrounds");
		// Add some campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground!");
					Comment.create(
					{
						text: "This is a very placey place",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment");
						}
					})
				}
			})
		});
	});
};

module.exports = seedDB;