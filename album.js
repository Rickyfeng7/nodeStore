var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "",
	database: "topsongsDB"
})

connection.connect(function(err) {
	if (err) {throw err};
	startApp();
});

function startApp() {
	inquirer.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		name: "choice",
		choices: ["Search By Artist", "Artists who appear more than once", "All data within a specific range", "Search by song", "Find artists with a top song and top album in the same year"],
	}
	]).then(function(res) {
		if (res.choice === "Search By Artist") {
			artistSearch();
		}
		else if (res.choice === "Artists who appear more than once") {
			multipleTimes();
		}
		else if (res.choice === "All data within a specific range") {
			rangeData();
		}
		else if (res.choice === "Find artists with a top song and top album in the same year") {startSearch()
		}
		else {
			songSearch();
		}
	})
}

function artistSearch() {
	inquirer.prompt([
	{
		message: "What artist would you like to search for?",
		name: "artist"
	}
	]).then(function(res) {
		connection.query("SELECT * FROM songs WHERE ?", [{
			artist: res.artist
		}], function(err, response) {
			if (err) {throw err}
			for (var i = 0; i < response.length; i++) {
				console.log("Position: " + response[i].id, "| Artist: " + response[i].artist, "| Song: " + response[i].song)
			}
			connection.end();
		})
	})
}

function multipleTimes() {
	var artistArray = [];
	connection.query("SELECT artist FROM songs GROUP BY artist HAVING count (*) > 3", function(err, res) {
		if (err) {throw err}
		for (var i = 0; i < res.length; i++) {
			var artist = res[i].artist;
			console.log(artist);
		}
	})
	connection.end();
}

function rangeData() {
	inquirer.prompt([
	{
		message: "Enter Starting Position",
		name: "start"
	},
	{
		message: "Enter Ending Position",
		name: "end"
	}
	]).then(function(res) {
		var query = "SELECT * FROM songs WHERE id BETWEEN ? AND ?"
		connection.query(query, [res.start, res.end],  function(err, response) {
			if (err) {throw err}
			for (var i = 0; i < response.length; i++) {
				console.log("Position: " + response[i].id, "| Artist: " + response[i].artist, "| Song: " + response[i].song)
			}
			connection.end();
		})
	})
}

function songSearch() {
	inquirer.prompt([
	{
		message: "What song would you like to search for?",
		name: "song"
	}
	]).then(function(res) {
		connection.query("SELECT * FROM songs WHERE ?", [{
			song: res.song
		}], function(err, response) {
			if (err) {throw err}
			for (var i = 0; i < response.length; i++) {
				console.log("Position: " + response[i].id, "| Artist: " + response[i].artist, "| Song: " + response[i].song)
			}
			connection.end();
		})
	})
}

function startSearch() {
	inquirer.prompt([
	{
		message: "What artist would you like to search for?",
		name: "artist"
	}
	]).then(function(response) {
		var query = "SELECT * FROM albums INNER JOIN songs ON albums.year = songs.year AND albums.band = songs.artist WHERE ?";
		connection.query(query, [{
			band: response.artist
		}], function(err, res) {
			if (err) {throw err}
				for (var i = 0; i < res.length; i++) {
					console.log("Position: " + res[i].id, "| Artist: " + res[i].artist, "| Album: " + res[i].album + "| Year: " + res[i].year + "| Song: " + res[i].song)
				}
		})
		connection.end();
	})
}