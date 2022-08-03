// const productsController = require('./utils/utils')
var fs = require("fs");
var data = fs.readFileSync("products.json");
var elements = JSON.parse(data);
const express = require("express");
const path = require("path");
const logger = require("morgan");
const myIndexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
//Init App
const app = express();
//Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', myIndexRouter);
app.use('/products', productsRouter);


//Start Server
app.listen(3000, function () {
  console.log("Server started on port 3000....");
});
