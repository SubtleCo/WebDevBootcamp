const express    = require("express"),
	  app 	     = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose"),
	  Campground = require("./models/campground"),
	  seedDB     = require("./seeds")

seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp_v3clea',{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to YelpCamp Database!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true})); // this is a commonly copy/pasted line //
app.set("view engine","ejs");

app.get("/", function(req,res){
	res.render("landing")
});

// INDEX ROUTE
app.get("/campgrounds", function(req,res){
	//get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("error");
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		};
	});
});

// NEW ROUTE
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/new", function(req,res){
		res.render("new");
});

// SHOW ROUTE - shows more info about one campground
app.get("/campgrounds/:id", (req,res) => {
	//find the campground using provided ID
	Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground)
			res.render("show", {campground:foundCampground})
		};
	});
	//render show template with that campground
})

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!")
});