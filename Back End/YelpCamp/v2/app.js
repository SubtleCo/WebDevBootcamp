const express    = require("express"),
	  app 	     = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp',{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to YelpCamp Database!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true})); // this is a commonly copy/pasted line //
app.set("view engine","ejs");


// Schema setup

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill", 
// 	 	image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80",
// 		description: "This is a huge granite hill. Cool, right?"
// 	}, function(err, campground){
// 		if(err){
// 			console.log("error");
// 		} else {
// 			console.log("Newly Created Campground:");
// 			console.log(campground);
// 		}
// 	});


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
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground:foundCampground})
		};
	});
	//render show template with that campground
})

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!")
});