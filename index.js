const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT|| 8000


const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//connection to your mysql database, using the localhost, root user, user password, and your database/name eg= acme, world etc
const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#$ashbella1988',
    //you can insert your created database name here
    //database: 'sampleDb'
});



//checking to see if mysql connection is successful if errors throw errors
mysqlConnect.connect((err, success) => {
    if(err) throw err;
    if(success) console.log("connection to mysql established")
});
///creating a mysql database inside express using the mysql query create database and sending a get request for it after refresh it in the workbench
//to see your created database//usually the database is created or imported into the workbench and called here with your password and local host connection
//you send the get request response in test or postman localhost: 8000
app.get("/", (req,res) =>{
    mysqlConnect.query("CREATE DATABASE sampleDb", (err, success) =>{
        if(err) throw err;
        if(success) res.send({message: "db created successfully"})
        
    })
})

//creating your tables row and column in your database using CREATE TABLE
//you send get request in test or postman localhost: 8000/table

const createTable =`CREATE TABLE users(
    id INT AUTO_INCREMENT,
       first_name VARCHAR(100),
       last_name VARCHAR(100),
       email VARCHAR(50),
       password VARCHAR(20),
       location VARCHAR(100),
       dept VARCHAR(100),
       is_admin TINYINT(1),
       register_date DATETIME,
       PRIMARY KEY(id)
    );`
app.get("/table", (req,res) =>{
    mysqlConnect.query(createTable, (err, success) =>{
        if(err) throw err;
        if(success) res.send({message: "table created successfully"})
        
    })
})


 //creating a database and table in the same syntax
const create =`CREATE TABLE usersname(
    id INT AUTO_INCREMENT,
       first_name VARCHAR(100),
       last_name VARCHAR(100),
       email VARCHAR(50),
       password VARCHAR(20),
       location VARCHAR(100),
       dept VARCHAR(100),
       is_admin TINYINT(1),
       register_date DATETIME,
       PRIMARY KEY(id)
    );`

app.get("/table2",(req,res) =>{
    mysqlConnect.query("CREATE DATABASE anotherDB", (err, success)=>{
        if(err) throw err;
        if(success){
            mysqlConnect.query("USE anotherDB", (err, success) => {
                if(err) throw err;
                if(success){
                    
                }
            })
            mysqlConnect.query(create, (err,success) => {
                if(err) throw err;
                if(success) res.send({message: "table created"})
            })
        }
   })
})



app.listen(PORT, () => console.log(`Listening on server at ${PORT}`));