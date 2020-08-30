window.setTimeout(function() {

let todos = [];
let input = prompt("What would you like to do?");

while (input !== "quit") {
	
	if (input === "list") { 
		listInputs();
	} else if (input === "new"){
		addTodo();
	} else if (input === "delete") {
		deleteTodo();
	}
	input = prompt("What would you like to do?");

	if (input === "quit") console.log("OK, you quit")
}

function listInputs() {
	console.log("*************");
	todos.forEach(function(item, index, array) {
		console.log(index + ". " + item);
	});
	console.log("*************");
}

function addTodo() {
	todos.push(prompt("Enter new todo"));
		console.log("New Todo Added")
}

function deleteTodo(){
	todos.splice(prompt("Which item should I delete?"),1);
	console.log("Item deleted from list!")
}
}, 500);
