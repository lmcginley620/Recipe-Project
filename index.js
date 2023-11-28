//******************************************************************************
//*** set up an HTTP server off port 5000
//******************************************************************************
const express = require("express");
const app = express();
const port = 8000;

//*** server waits indefinitely for incoming requests
app.listen(port, function () {
    console.log("NodeJS app listening on port " + port);
});

//*** create form parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


//******************************************************************************
//*** set up mysql connections
// ******************************************************************************
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nascar620",  // use your own MySQL root password
    database: "recipe_project"
});

//*** connect to the database
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected to MySQL");
});


// Your existing connection code...

// Handle form submissions
app.post('/search', (req, res) => {
    const { foodItem } = req.body;
    const sql = 'SELECT * FROM recipes WHERE food_item = ?';
    db.query(sql, [foodItem], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/addRecipe', (req, res) => {
    const { foodItem, recipeDescription } = req.body;
    const sql = 'INSERT INTO recipes (user_id, food_item, recipe_description) VALUES (?, ?, ?)';
    db.query(sql, [1, foodItem, recipeDescription], (err, result) => {
        if (err) throw err;
        res.send('Recipe added');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
