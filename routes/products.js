const path = require('path');
const express = require('express');
const router = express.Router();
const productController = require('./../utils/utils.js');
var fs = require('fs');
var data = fs.readFileSync('./../products.json');
var elements = JSON.parse(data);



router.get('/json', function(req, res, next) {
  res.send(elements);
  });

router.get('/', function(req, res, next) {
    let order = req.query.order;
    let title = req.query.title;
    let productsToRender = [];
    console.log(title)
    if(order){
       
            productController.oderByPrice(order)
            .forEach(elem => productsToRender.push(elem))
          
    }else{
       productController.getAll()
                        .forEach(elem => productsToRender.push(elem))   
    }

    if(title){
      productsToRender = productController.filterByTitle(title,productsToRender);
    }


    res.render('products-container', {
      products: productsToRender
    });

  });

  router.get('/:id', (req, res) => {
    let productId = req.params['id'];
    console.log(productId);
    res.sendFile(path.join(__dirname, './../02_productDetailPage/02_index.html'));
  })


module.exports = router