const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config({ path: './.env' })

const app = express();

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABAS_PASSWORD,
    database: process.env.DATABASE
});


app.post('/create', (req,res) => {
    console.log(res.body)
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO users (name, email, password) VALUES (?,?,?),' [name, email, password],
        (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values Inserted" + result)
          }
        }
    );
})



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

app.listen(3001, () => {
    console.log("Server started on Port 8112")
})