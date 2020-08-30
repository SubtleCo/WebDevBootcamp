const expressSanitizer = require("express-sanitizer"),
      methodOverride   = require("method-override"),
	  bodyParser       = require("body-parser"),
	  mongoose         = require("mongoose"),
	  express          = require("express"),
	  app              = express();
	  

// App Config  
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());





// Mongoose Model Config
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})
const Blog = mongoose.model("Blog", blogSchema);

          
//------------------//------------------//------------------//------------------//------------------//------------------//
//---------------------------------------------------RESTful ROUTES-----------------------------------------------------//
//------------------//------------------//------------------//------------------//------------------//------------------//


//---------------------------------------------------INDEX route--------------------------------------------------------//

app.get("/", (req,res) =>{
	res.redirect("/blogs")
})

app.get("/blogs", (req,res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs:blogs});
		}
	});
});

//---------------------------------------------------NEW route---------------------------------------------------------//
app.get("/blogs/new", (req,res) =>{
		res.render("new");
});

//---------------------------------------------------CREATE route------------------------------------------------------//
app.post("/blogs", (req,res) =>{
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

//---------------------------------------------------SHOW route--------------------------------------------------------//
app.get("/blogs/:id", (req,res) =>{
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/");
		} else {
			res.render("show", {blog:foundBlog});
		}
	})
});
//---------------------------------------------------EDIT route--------------------------------------------------------//
app.get("/blogs/:id/edit", (req, res) =>{
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});


//---------------------------------------------------UPDATE route------------------------------------------------------//
app.put("/blogs/:id", (req,res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

//---------------------------------------------------DESTROY route-----------------------------------------------------//
app.delete("/blogs/:id", (req,res) =>{
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});


app.listen(process.env.PORT||3000, process.env.IP, () => console.log("Server running on port 3000."));