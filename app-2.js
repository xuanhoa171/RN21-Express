
let express = require('express');
let logger = require("morgan")
let fs = require("fs")
let app = express();


// app.use();  middware
// app.use("enpoint", callback);  1 enpoint 1 callback 

let home_handler = (req, res) => {
  res.json({
    "message": "Hello from application"
  })
}

let user_handler = (req, res, next) => {
   fs.readFile('test.txt', 'utf8', (err, data) => {
      if (err) {
        next(err)
        return;
      }
     res.json(data);
    });
}

let error_handler = (err, req, res) => {
   res.status(500).json({
      message:err.message
   })
}

app.use(logger("dev"))

// regex string 
app.use("/user", user_handler)
app.use("/", home_handler)
app.use(error_handler)

module.exports = app;

