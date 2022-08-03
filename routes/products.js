const path = require('path');
const express = require('express');
const router = express.Router();
const productController = require('./../utils/utils.js');



router.get('/', function(req, res, next) {
    let order = req.query.order;
    let title = req.query.title;
    let productsToRender = productController.orderByPriceFilterByTitle(order,title);
    console.log(productController.orderByPriceFilterByTitle(order,title));

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