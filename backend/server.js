const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

/*


@TODO

Register

Name
Email
Password  (hash it with bcrypt)

Returns Acess Token & Refresh Token

When user is done registering send email to them to verify email address




 */

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/" , (req,res) => {});

// Encryption
const saltRounds = 10;


app.post("/register", async (req , res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10)
    await bcrypt.compare(password, hash)
        .then((res) => {console.log(res)})

    db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hash],
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

app.post("/login", async (req , res) => {
    try {
    const {email, password} = req.body;
    const user = await db.query(`SELECT * FROM users WHERE email = ${mysql.escape(email)}`, [email] , async (err, result) => {
        if (result){
            console.log(result)
            const validPass = await bcrypt.compare(password, user.hash) // fix this
            if (validPass){
                res.status(200).json('Valid Email and Pass!');
            } else{
                res.json('Wrong pass')
            }
        } else{
            res.status(404).json("User not found!");
        }
    })


    } catch (e) {
        console.log(e)
    }
})

app.post("/", (req , res) => {

   /*
   const  name = req.body.name
   */

})

app.get("/username" , (req,res) => {})



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

const PORT = 3001;

app.listen(PORT, () => {
    console.log("Server started on Port 3001")
})