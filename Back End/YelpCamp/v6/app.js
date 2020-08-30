const express    = require("express"),
	  app 	     = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose"),
	  Campground = require("./models/campground"),
	  passport   = require("passport"),
	  LocalStrategy = require("passport-local"),
	  seedDB     = require("./seeds"),
	  Comment    = require("./models/comment"),
	  User       = require("./models/user");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v6',{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log("Connected to YelpCamp Database!"))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true})); // this is a commonly copy/pasted line //
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIG

app.use(require("express-session")({
	secret: "very subtle yes",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass user info to all pages
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

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
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
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
		res.render("campgrounds/new");
});

// SHOW ROUTE - shows more info about one campground
app.get("/campgrounds/:id", (req,res) => {
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

// =========================
//     COMMENTS ROUTES
// =========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req,res) => {
	//FInd campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	})
})

app.post("/campgrounds/:id/comments", isLoggedIn, (req,res) => {
	// lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			res.redirect("/campground");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	// create new comment
	// connect new comment to campground
	// redirect to campground show page
	
})


//============
// AUTH ROUTES
//============

// show register form
app.get("/register", (req,res) =>{
	res.render("register");
})

app.post("/register", (req,res) =>{
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
app.get("/login", (req,res) =>{
	res.render("login");
})

app.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), (req,res) =>{});

// logout route

app.get("/logout", (req,res) => {
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

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!")
});