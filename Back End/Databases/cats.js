const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app",{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>console.log('Connected to DB!'))
.catch(error=>console.log(error.message));

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// let george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 70,
// 	temperament: "evil"
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("bad!")
// 	} else {
// 		console.log("We jsut saved a cat to the database!")
// 		console.log(cat)
// 	}
// });

//retrieve all cats from the DB and console.log each one

// Cat.find({}, function(err, cats){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log("All the cats...");
// 		console.log(cats);
// 	}
// })

Cat.create({
	name: "Third Cat",
	age: 12,
	temperament: "bland",
}, function(err, cat){
	if(err) {
		console.log(err)
	} else {
		console.log(cat)
	}
});
