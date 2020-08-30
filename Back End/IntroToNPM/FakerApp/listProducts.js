var faker = require("faker");

//console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
let store = [];
for (let i = 0; i < 10; i++){
	let product = faker.fake("{{company.bsAdjective}} {{company.bsNoun}} {{commerce.product}}");
	let price = faker.fake("{{commerce.price}}");
	store.push(product + " - " + price);
}

let banner = "===================\nWELCOME TO MY SHOP!\n==================="

console.log(banner);
store.forEach(function(item){
	console.log(item);
})