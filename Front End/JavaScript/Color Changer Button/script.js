console.log("Connected");

let button = document.getElementsByTagName("button")[0];

let bg = document.getElementsByTagName("body")[0]

//button.addEventListener("click", function() {
//	document.body.style.background = document.body.style.background === "blue" ? "white" : "blue"; 
//})

// OR

button.addEventListener("click", function() {
	document.body.classList.toggle("blue");
})