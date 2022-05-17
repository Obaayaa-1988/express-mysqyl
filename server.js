//conecting express with mysql database
//You will be using all mysql queries here just like in mongodb
//you have to do the npm init -y, npm install express, mysql2, nodemon and all the dependecies you need
//you create your express server and your port
//create a nonnectio  for mysql databse
//user root the root that is me you created in mysql work bench with my password when i created my mysql profile #$ashbella1988
//
//if you are the root user you will need to provide a password 

const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT|| 8000


const app = express();

//middleware without the middleware to authenticate the request and responds it will be imposibble to show your results
//in postman when you make a post request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//connection to your mysql database, using the localhost, root user, user password, and your database/name eg= acme, world etc
//must already created the localhost and connection with your password in workbench
//and imported database into your workbench 
const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#$ashbella1988',
    database: 'acme'
});



//checking to see if mysql connection is successful if errors throw errors
mysqlConnect.connect((err, success) => {
    if(err) throw err;
    if(success) console.log("connection to mysql established")
});

//get request syntax for fetching all datas from the database, query is from mysql modules(postman get=localhost:8000 and send)
//select * from (users) is actually a table in a database called acme and a table created in the acme database called 'users' mysql select is use to show all columns and rows(inputs users) from table(users) created in the mysql database
//this will fetch all the columns and rows(table user) in the database we already have
app.get('/', (req,res) => {
    mysqlConnect.query("SELECT * FROM users", (err, result) => {
        if(result) res.send(result)
    })
})

//inserting data into your database
//req.body for creating new data into our database
app.post('/create', (req, res) =>{
    const firstName= req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const location = req.body.location;
    const dept = req.body.dept;
    const isAdmin = req.body.isAdmin;
    const registerDate = req.body.registerDate;
                       //insert into users is a mysql syntax for inserting records into the table user, the ?? is used to show that a value will be added later
    mysqlConnect.query("INSERT INTO users(first_name, last_name, email, password, location, dept, is_admin, register_date) values(?,?,?,?,?,?,?,?);",
    [firstName, lastName, email, password, location, dept, isAdmin, registerDate], (err, result) => {
        if(err) throw err;
        if(result) res.send(result);
    })
})

//finding one user from our acme databse
app.get('/getuser/:id', (req,res) => {
    const id = req.params.id;
    mysqlConnect.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
        if(err) throw err;
        if(result) res.send(result)
    })
})

//alternative way of fetching data from any table as long as it is within the database 
//unknown could be any table from the databasw, eg, acme, world, album etc

app.get('/:tableName', (req, res) => {
    const unknown = req.params.tableName;
    mysqlConnect.query(`SELECT * FROM ${unknown}`, (err, result) => {
        if(err) throw err;
        if(result) res.send(result)
    })
})

//deleting a row/column from a table in a database,you can use the get or delete crud operation
app.get('/deleteuser/:id', (req,res) => {
    const id = req.params.id;
    mysqlConnect.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if(err) throw err;
        if(result) res.send(result)
    })
})

//updating for a particular data in a table
app.put('/update-user/:id', (req,res) =>{
    const id = req.params.id
    const firstName= req.body.firstName;
    mysqlConnect.query("UPDATE users SET first_name =? WHERE id=?", [firstName,id], (err, result) =>{
        if(err) throw err;
        if(result) res.send(result);

    })
    
})





app.listen(PORT, () => console.log(`Listening on server at ${PORT}`));