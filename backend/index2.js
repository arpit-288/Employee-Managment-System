const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const mariadb = require('mariadb');
const express = require('express');
const { createPool } = require('mysql');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
const db = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'edms',
  port: 3306
});


// Getting all the data from database
app.get('/home', (req, res) => {

  // res.send('User Page is loading...');
  let sql = "Select * from employee";
  db.query(sql, (err, result) => {

    if (err) {
      console.log(err, 'There is an error here');
      res.send({
        message: 'Error in loading data..'
      })
    }

    res.send({
      message: 'all user data',
      data: result
    });

  });
});

// const middlewaren=(req,res,next)=>{
//   console.log("this is midleware");

//   next();
// }

// Getting  single data
app.get('/home/:id', (req, res) => {

  let gID = req.params.id;

  let qr = `select * from user where id = ${gID}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        message: 'Error in single data'
      })
    }
    if (result.length > 0) {
      res.send({
        message: 'get single data...',
        data: result
      });
    } else {
      res.send({
        message: 'Error in getting single data...'
      });
    }
  });
});

// app.get('/secfile' , middlewaren ,(req,res)=>{
//   res.send("secretttttt!")
// })

function myQuery(database,sql,res){
    return new Promise((resolv,reject)=>{
        database.query(sql, (err, result) => {
          if(err){
              console.log(err)
              res.json({
                message: 'Error in loading data..'
              })
              reject(err)
          }
          else
            resolv(result)  
          })
        })
}

//  create data
app.post('/signup',async (req, res) => {

  console.log(req.body, 'createdata');

  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;


  let sql = "Select * from employee";
  
  try {
    let result = await myQuery(db,sql,res)

      //// promise1

      let qr = ''
      if (result.length > 0) {
  
        qr = `insert into employee(name,email,password) values('${name}','${email}','${password}')`;
  
      } else {
        qr = `insert into employee(id, name,email,password) values(1,'${name}','${email}','${password}')`;
      }

      let res2 = await myQuery(db,qr,res)
      res.send({
        message: "Created..",
        error: false,
        data: result.insertId
      });
  } catch (error) {
      console.log(error)
  }

});

console.log( process.env.TOKEN_KEY);

// vailidate Login Crediential
app.post("/login", (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  

  // let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let jwtSecretKey = process.env.TOKEN_KEY;
  console.log(jwtSecretKey,typeof(jwtSecretKey))


  let data = {
    mail:email,
    passcode:password
  };

  const Token = jwt.sign(data, jwtSecretKey);
  console.log(Token);     

  
  let qr = `SELECT * from EMPLOYEE WHERE email = '${email}'`;
  console.log(qr);

  db.query(qr, (error, result) => {

    if (!error) {
      if (result.length) {
        console.log(result); 
        // console.log(res);
        if (result[0].password == password) {
          res.json({       
            error: false,
            flag: true,
            message: "Login successfully",
            token:Token
          })
        }
        else {
          res.json({message:"Incorrect Password",
                    error: true,
                    flag:false
                  });
        }
      } 
      else {
        res.json({
          error: false,
          flag: false,
          message: "User doesn't exist",
        });
      }
    }
    else {
      res.json({
        error: true,
        message: "Error in getting loging credentials"
      });
    }
  });
});



// Update Data
app.put("/employee/:id", (req, res) => {

  // console.log(req.body,'createdata');

  let uid = req.params.id;
  let task_name = req.body.task_name;

  let qr = `update user set task_name ${task_name} where id=${uid}`;

  db.query(qr, (err, result) => {

    if (err) {
      console.log(err, "Error in updating data");
    }
    res.send({
      message: 'Data Updated...'
    });

  });

});

// Delete Single Data
app.delete('/employee/:id', (req, res) => {
  let qid = req.params.id;
  let qr = `delete from user where id = ${qid}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Error in deleting data");
      res.send({
        message: "Server Error",
        error: true
      });
    }
    res.send({
      error: false,
      message: 'Data Deleted..'
    });

  });
});





// Getting Employee Details Data
app.get('/employeedetails',(req,res)=>{
  let sql = "Select * from employeedetails";
  db.query(sql, (err, result) => {

    if (err) {
      console.log(err, 'There is an error here');
      res.send({
        message: 'Error in loading data..'
      })
    }

    res.send({
      message: 'all user data',
      data: result
    });

  });
});

// Posting Employee Data
app.post('/employeedetails',(req,res)=>{
  // console.log(req.body);

  let name = req.body.Name;
  let designation = req.body.Designation;
  let department = req.body.Department;
  let email = req.body.Email;
  let phone = req.body.Phone;
  let date = req.body.Date;

  let sql = `Select * from employeedetails`;

  db.query(sql,(err,result)=>{
    if(!err){

        let sql = '';
        // console.log(result);

      if(result.length>0){
         sql = `insert into employeedetails(Name,Designation,Department,Email,Phone,Date) values('${name}','${designation}','${department}','${email}','${phone}','${date}')`
        }

        else{
           sql = `insert into employeedetails(id,Name,Designation,Department,Email,Phone,Date) values(1,'${name}','${designation}','${department}','${email}','${phone}','${date}')`
        }

      db.query(sql,(err,result)=>{
        if(err){
          console.log("Hey!, I am Back again (Errrorrr!!)",err);
          res.send("error ");
        }
        else{
          res.send("data added");
        }
      })
        
    }
    else{
      res.send("data added");
    }
  })


  // let sql = `Insert into employeedetails values()` ;
  // db.query(sql,(err,result)=>{
  //   console.log(req.body);
  // });
});

// Delete Employee Data
app.delete('/employeedetails/:id', (req, res) => {
  let qid = req.params.id;
  // console.log(qid);
  let qr = `delete from employeedetails where id = ${qid}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "Error in deleting data");
      res.send({
        message: "Server Error",
        error: true
      });
    }
    res.send({
      error: false,
      message: 'Data Deleted..'
    });

  });
});



// Getting all Department
app.get('/employeedepartment',(req,res)=>{
  let sql = "Select Department from employeedetails";
  db.query(sql, (err, result) => {

    if (err) {
      console.log(err, 'There is an error here');
      res.send({
        message: 'Error in loading data..'
      })
    }

    res.send({
      message: 'all user data',
      data: result
    });

  });
})


// Server Check
app.listen(process.env.PORT, () => {
  console.log(`server running on.. ${process.env.PORT}`);
});












