const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// USER - email, name
const postSchema = new mongoose.Schema({
	title: String,
	content: String
});

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

const User = mongoose.model("User", userSchema);


// const Post = mongoose.model("Post", postSchema);

// const newUser = new User({
// 	email:"hermione@hogwarts.edu",
// 	name: "Hermione Granger"
// });

// newUser.posts.push({
// 	title: "How to brew potions",
// 	content: "askldfhj alksdjfh alksdhj fajklsdhfajkl dfhaklsjdh ldf"
// })

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log(user)
// 	}
// });



// const newPost = new Post({
// 	title: "How to brew potions",
// 	content: "askldfhj alksdjfh alksdhj fajklsdhfajkl dfhaklsjdh ldf"
// });

// newPost.save(function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });

User.findOne({name: "Hermione Granger"}, function(err, user){
	if(err){
		console.log(err)
	} else {
		user.posts.push({
			title: "12345",
			content: "ahahahafh sdkfjhs fhahhahahahah ajksdfh"
		});
		user.save((err, user) => {
			if(err){
				console.log(err);
			} else {
				console.log(user);
			}
		});
	}
});