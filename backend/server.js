const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});

db.connect( (error) => {
    if (error){
        console.log(error);
    } else {
        console.log("MYSQL Connected...")
    }
})

app.use('/' , (req,res) => {
    res.send("<h1> Home Page</h1>");
})

app.listen(8112, () => {
    console.log("Server started on Port 8000")
})