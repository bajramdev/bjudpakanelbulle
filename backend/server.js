const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

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

const verifyJWT = (req, res, next) => {
    const  token = req.headers["x-access-token"]
    if (!token) {
        res.send("Yo, we need a token, please give it to us next")
    } else {
        jwt.verify(token, process.env.JWTSecret_Key , (err, user) => {
            if (err)  return res.sendStatus(403)
            req.user = user;
            next()

        })
    }
}

app.get('/isUserAuth' , verifyJWT ,  (req,res) => {
    res.send("Yo, u are authenticated")
})

app.get("/login", (req,res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({loggedIn: false})
    }
})

app.post("/login", async (req , res) => {

    const email = req.body.email;
    const password = req.body.password;
         db.query(`SELECT * FROM users WHERE email = ?;`, email , async (err, result) => {
         if (err){
             console.log({ err: err });
         }
            await bcrypt.compare(password, result[0].password, (err, response) => {
                if (response){
                    try {
                        const id = result[0].id
                        const token = jwt.sign({id}, process.env.JWTSecret_Key, {
                            expiresIn: 300,
                        })
                        req.user = result;
                        res.json({
                            auth: true,
                            token: token,
                            result: result
                        });
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    res.json({
                        auth: false,
                        message: "Wrong username/password combination"
                    });
                }
        })
}
)


        /*

        if (result){
            let resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            for (const elem of resultArray){
                var hashedPassword =  elem.password
            }
            await bcrypt.compare(password, hashedPassword, (err, res) => {
                if (res === true){
                    console.log("Access granted")

                    const id = res

                } else{
                    console.log("Access denied")
                }
            });

        } else{
            res.status(404).json("User not found!");
        }
    })
         */



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

const PORT = 3007;

app.listen(PORT, () => {
    console.log("Server started on Port 3007")
})