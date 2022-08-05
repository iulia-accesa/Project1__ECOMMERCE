
const PORT = require('./../utils/config');
const path = require("path");
const express = require("express");
const router = express.Router();
const pug = require("pug");
const productController = require("./../utils/utils.js");
const axios = require('axios');
productController.fetchProducts();
const CHECK_IF_PRODUCT_IS_IN_CART = `http://localhost:${PORT}/cart`;
const get_ALL_CART_PRODUCTS = `http://localhost:${PORT}/cart/get/all`;
router.get("/", function (req, res, next) {



  let order = req.query.order;
  let title = req.query.title;
  
  let productsToRender = productController
    .orderByPriceFilterByTitle(order, title)
    .getAll();
 
 
  axios.get(get_ALL_CART_PRODUCTS)
  .then(response => response.data.cart)
  .then((cart) => {
      const arrOfNumbers = cart.map(str => Number(str));
      res.render("products-container", {
    products: productsToRender,
    productsCart : arrOfNumbers
  });
  })
  .catch(error => console.error(error));


});

async function isInCart(productId) {
  
      try{
      const response = await axios.get(CHECK_IF_PRODUCT_IS_IN_CART + '/' + productId)
      return response.data.isInCart;
      }catch(err){
        console.error(err);
        return null;
      }

}

router.get("/:id", (req, res) => {
  let productId = req.params["id"];
  isInCart(productId).then((response) => 
    {console.log(response);
      res.render("product",{ 
        product: productController.findById(productId),
        inCart:response});

    }   
    ); 
});



module.exports = router;
