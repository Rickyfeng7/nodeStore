var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var password = require ("./keys.js")
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: password,
	database: "salesdb"
})

connection.connect(function(err) {
	if (err) throw err;
	 // console.log("Connected as id: " + connection.threadId + "\n");
});

// function start(){
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
// 		customerScreen()
// 	})
// }

// start();
customerScreen();
function customerScreen(){
	connection.query("SELECT * FROM products", function(err, res){
	if (err) console.log(err)
	var table = new Table({
	head:["id", "player", "sport", "department", "price", "stock"]
	})
	for(var i = 0; i < res.length; i++){
		table.push([res[i].id, res[i].player, res[i].sport, res[i].department, res[i].price, res[i].stock]
		)
	}
	console.log("\n" + table.toString());
	buyer();
	})
};

function buyer(){
connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
			name: "choice",
			type: "rawlist",
			choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].player);
            }
            return choiceArray;
          },
          message: "what do you wanna buy ?"
        },
        {
          name: "userQuantity",
          type: "input",
          message: "How much would you want to buy?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].player === answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock >= parseInt(answer.userQuantity)) { var itemsStock = chosenItem.stock - parseInt(answer.userQuantity)
          
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock: itemsStock
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("you have successfully!" + chosenItem.player + " jersey" );
              customerScreen();
            }
          );
        }
        else {
          console.log("not enough in stock");
        }
      });
  });
}
