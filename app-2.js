let express = require("express");
let logger = require("morgan");
let fs = require("fs");
let app = express();
let commentData = require("./data/comment.json")
let fetch =require("node-fetch").default

// app.use();  middware
// app.use("enpoint", callback);  1 enpoint 1 callback

let home_handler = (req, res) => {
  res.json({
    message: "Hello from application",
  });
};

let user_handler = (req, res, next) => {
  fs.readFile("data/users.json", "utf8", (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.json(data);
  });
};

//  read data từ file comments -> trả về cho người dùng
// let comment_handler = (req, res, next) => {
//    fs.readFile("data/comment.json", "utf8", (err, data) => {
//      if (err) {
//        next(err);
//        return;
//      }
//    //   res.json(data);
//     JSON.parse(res.data)
//    });
//  };



let error_handler = (err, req, res) => {
  res.status(500).json({
    message: err.message,
  });
};


app.get("comment", (req, res) => {
   res.send(commentData)
})

app.get("/pokemon", async(req,res)=> {
   const dataPokemon = await(
      await fetch(" https://pokeapi.co/api/v2/pokemon/ditto")
   ).json();
   res.send(dataPokemon)
})


app.use(logger("dev"));

// regex string
app.use("/pokemon")
// app.use("/comment", comment_handler);
app.use("/user", user_handler);
app.use("/", home_handler);
app.use(error_handler);

module.exports = app;
