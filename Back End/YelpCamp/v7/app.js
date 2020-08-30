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

// requiring routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index")
	  
	  
mongoose.connect('mongodb://localhost:27017/yelp_camp_v7',{
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

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("The YelpCamp server has started!")
});