const express  = require("express"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  bodyParser = require("body-parser"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  User = require("./models/user")
	  
	  
mongoose.connect("mongodb://localhost:27017/auth_demo_app",{
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("DB Connected"));

const app = express();
app.use(require("express-session")({
	secret: "very subtle yes",
	resave: false,
	saveUninitialized: false
}));
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================
//             ROUTES
//==================================
app.get("/", (req,res) =>{
	res.render("home");
});
	

// === MIDDLEWARE!
app.get("/secret",isLoggedIn, (req,res) =>{
	res.render("secret");
});

// === Show Sign Up Form
app.get("/register", (req,res) =>{
	res.render("register")
})

// === handle user signing up
app.post("/register", (req,res)=>{
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err){
			console.log(err);
			return res.render("register");
		}
		console.log(user);
		passport.authenticate("local")(req, res, function() {
			res.redirect("secret");
		})
	})
})


// === LOGIN ROUTES

// render login form
app.get("/login", (req,res) => {
	res.render("login");
})

// login logic using middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
	}),(req,res) => {});


// === LOGOUT ROUTES
app.get("/logout", (req,res)=>{
	req.logout();
	res.redirect("/");
});

app.listen(process.env.PORT||3000, process.env.IP, () =>{
	console.log("server good");
});