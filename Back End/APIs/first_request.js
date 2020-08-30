const axios = require("axios")

axios.get("http://www.google.com")
	.then(function(response){
		console.log(response.status);
		})
	.catch(function(error){
		console.log(error);
		})
	.finally(function()		{
		//always executed
		});
