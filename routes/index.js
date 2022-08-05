var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/shop', function(req, res, next) {
  res.sendFile(path.join(__dirname, './../01_productListPage-Main/01_index.html'));
});


router.get('/', function(req, res, next) {
  res.send("Welcome");
});
module.exports = router;



router.get("/product-details",(req,res) => {
  res.sendFile(path.join(__dirname, "./../02_productDetailPage/02_index.html"));
})
