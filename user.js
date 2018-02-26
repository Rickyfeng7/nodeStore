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
			{
				type:"input",
				message:"how many do you wanna buy?",
				name:"quantity"
			}
		])
	.then(function(res){
		var intiger = res.choice;

		connection.query("SELECT * FROM stock WHERE id=?", intiger, function(err, res){
       if(err) console.log(err, 'That item ID\ doesn\'t exist');
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
			
		}
	   	});
	})

	// console.log(hold)
}
// function quantity(){

// 	inquirer.prompt([
// 		{
// 			type:"input",
// 			message:"how many do you wanna buy?",
// 			name:"quantity"
// 		}
// 	])
// 	.then(function(answer){
// 		var quantity = answer.quantity
// 		if(quantity > res[0].stock.quantity){
// 			console.log("not in stock")
// 		} else{
// 			console.log("Thanks for your purchese" + quantity)
// 		}
// 	})
// }
// .then(function(answer){
// var quantity = answer.quantity;
// if(quantity > res[0].stock_quantity){
// console.log("not enough stock");
// } else {
// var newQuantity = res[0].stock_quantity - quantity;

// connection.query("UPDATE products SET stock_quantity = " + newQuantity +" WHERE id = " + purchaseId, function(err, res){
// if(err) throw err;
// console.log('Problem ', err);

// console.log("Thank you for purchasing: Your total is:" + quantity * res[0].price);
// })


// }
// })




customerScreen();

