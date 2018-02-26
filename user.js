var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "UCBricky2018!",
	database: "salesdb"
})

connection.connect(function(err) {
	if (err) throw err;
	 // console.log("Connected as id: " + connection.threadId + "\n");
});

// function inquirer(){
// 	inquirer.prompt([
// 			{
// 				type:"Check Box",
// 				message:"\nAre you a Customer, Managers or CEO ?",
// 				choices: 
// 				[
// 					"Customer",
// 					"Managers",
// 					"CEO"
// 				]
// 			}
// 		])
// 	.then(function(response){
// 		// switch(answer.action){
// 		// 	case "Customer"
// 		// 		// customerScreen();
// 		// 	break;

// 		// 	case "Managers"

// 		// 	break;

// 		// 	case "CEO"

// 		// 	break;
// 		// }
		
// 	})
// }

// inquirer();

function customerScreen(){
	connection.query("SELECT * FROM stock", function(err, res){
		if (err) console.log(err)
		var table = new Table({
		head:["id", "player", "sport", "department", "price", "stock"]
		})
		for(var i = 0; i < res.length; i++){
			table.push([res[i].id, res[i].player, res[i].sport, res[i].department, res[i].price, res[i].stock]
			)
		}
		console.log("\n" + table.toString());
		customerPrompt();
	})
};


function customerPrompt(){
	var hold = [];
	inquirer.prompt([
			{
				type:"input",
				message:"What would you like to buy ?",
				name:"choice"
			},
		])
	.then(function(res){
		var intiger = res.choice;

		connection.query("SELECT * FROM stock WHERE id=?", intiger, function(err, res){
       	if(err) console.log(err, "not a valid id");
       	console.log(res);
		console.log(intiger)
		var number = parseInt(intiger)
		if(Number.isNaN(number)){
			console.log("choose a valid number");
			customerPrompt();
		}
		else if (number === 0){
			console.log("zero is not a choice");
			customerPrompt();
		}
		else if (number > 10 ){
			console.log("not in stock atm");
			customerPrompt();
		}
		else{
			quantity();
	   	};
	})

	// console.log(hold)
})
}

function quantity(){
	connection.query("SELECT * FROM stock", function(err, res){
	inquirer.prompt([
		{
			type:"input",
			message:"how many do you wanna buy?",
			name:"quantity"
		}
	])
	.then(function(answer){
		var quantity = answer.quantity
		if(quantity > res[0].stock.quantity){
			console.log("not in stock")
		} else{
			console.log("Thanks for your purchese" + quantity)
		}
	})
	})
}



customerScreen();

