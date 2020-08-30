const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Bacon ipsum dolor amet pork belly cow ham hock ball tip, tail pork chop sirloin bacon doner shoulder. T-bone frankfurter bacon turducken porchetta, spare ribs shank short loin leberkas strip steak pork loin doner beef jowl. Spare ribs tenderloin pork chop shoulder, pork loin leberkas landjaeger shankle. Hamburger swine bresaola short ribs, burgdoggen biltong turducken brisket short loin. Prosciutto filet mignon pork loin, jowl brisket jerky tenderloin frankfurter salami ham hock bacon cow burgdoggen chuck meatball. Prosciutto sausage pork loin pork belly flank. Ball tip shoulder biltong kevin. Brisket filet mignon frankfurter ball tip corned beef cow capicola. Short ribs shank meatball beef turducken porchetta. Cow pancetta fatback drumstick tenderloin turducken. Shankle pork swine doner. Tongue pancetta cupim pork chop, sausage jowl tail shankle. Venison pork tenderloin ribeye pig spare ribs meatloaf. Beef ribs jowl rump tail, landjaeger cupim bacon. Capicola short loin chislic, ham andouille meatball beef ribs turkey fatback spare ribs t-bone ground round. Pancetta pork belly jowl kielbasa brisket shoulder biltong shank short ribs chuck short loin beef. Jowl shoulder chuck hamburger frankfurter ground round filet mignon salami sausage fatback. Pork loin venison prosciutto swine. T-bone spare ribs strip steak buffalo swine chuck tri-tip shank pancetta meatloaf hamburger. Swine porchetta meatball brisket chicken ribeye bacon tongue doner pork jerky hamburger shankle prosciutto."
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1583872922377-88058309c346?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Bacon ipsum dolor amet pork belly cow ham hock ball tip, tail pork chop sirloin bacon doner shoulder. T-bone frankfurter bacon turducken porchetta, spare ribs shank short loin leberkas strip steak pork loin doner beef jowl. Spare ribs tenderloin pork chop shoulder, pork loin leberkas landjaeger shankle. Hamburger swine bresaola short ribs, burgdoggen biltong turducken brisket short loin. Prosciutto filet mignon pork loin, jowl brisket jerky tenderloin frankfurter salami ham hock bacon cow burgdoggen chuck meatball. Prosciutto sausage pork loin pork belly flank. Ball tip shoulder biltong kevin. Brisket filet mignon frankfurter ball tip corned beef cow capicola. Short ribs shank meatball beef turducken porchetta. Cow pancetta fatback drumstick tenderloin turducken. Shankle pork swine doner. Tongue pancetta cupim pork chop, sausage jowl tail shankle. Venison pork tenderloin ribeye pig spare ribs meatloaf. Beef ribs jowl rump tail, landjaeger cupim bacon. Capicola short loin chislic, ham andouille meatball beef ribs turkey fatback spare ribs t-bone ground round. Pancetta pork belly jowl kielbasa brisket shoulder biltong shank short ribs chuck short loin beef. Jowl shoulder chuck hamburger frankfurter ground round filet mignon salami sausage fatback. Pork loin venison prosciutto swine. T-bone spare ribs strip steak buffalo swine chuck tri-tip shank pancetta meatloaf hamburger. Swine porchetta meatball brisket chicken ribeye bacon tongue doner pork jerky hamburger shankle prosciutto."
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1521404115841-baa52edcb041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
		description: "Bacon ipsum dolor amet pork belly cow ham hock ball tip, tail pork chop sirloin bacon doner shoulder. T-bone frankfurter bacon turducken porchetta, spare ribs shank short loin leberkas strip steak pork loin doner beef jowl. Spare ribs tenderloin pork chop shoulder, pork loin leberkas landjaeger shankle. Hamburger swine bresaola short ribs, burgdoggen biltong turducken brisket short loin. Prosciutto filet mignon pork loin, jowl brisket jerky tenderloin frankfurter salami ham hock bacon cow burgdoggen chuck meatball. Prosciutto sausage pork loin pork belly flank. Ball tip shoulder biltong kevin. Brisket filet mignon frankfurter ball tip corned beef cow capicola. Short ribs shank meatball beef turducken porchetta. Cow pancetta fatback drumstick tenderloin turducken. Shankle pork swine doner. Tongue pancetta cupim pork chop, sausage jowl tail shankle. Venison pork tenderloin ribeye pig spare ribs meatloaf. Beef ribs jowl rump tail, landjaeger cupim bacon. Capicola short loin chislic, ham andouille meatball beef ribs turkey fatback spare ribs t-bone ground round. Pancetta pork belly jowl kielbasa brisket shoulder biltong shank short ribs chuck short loin beef. Jowl shoulder chuck hamburger frankfurter ground round filet mignon salami sausage fatback. Pork loin venison prosciutto swine. T-bone spare ribs strip steak buffalo swine chuck tri-tip shank pancetta meatloaf hamburger. Swine porchetta meatball brisket chicken ribeye bacon tongue doner pork jerky hamburger shankle prosciutto."
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
// 		data.forEach(function(seed){
// 			Campground.create(seed, function(err, campground){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log("added a campground!");
// 					Comment.create(
// 					{
// 						text: "This is a very placey place",
// 						author: "Homer"
// 					}, function(err, comment){
// 						if(err){
// 							console.log(err);
// 						} else {
// 							campground.comments.push(comment);
// 							campground.save();
// 							console.log("Created new comment");
// 						}
// 					})
// 				}
// 			})
// 		});
	});
};

module.exports = seedDB;