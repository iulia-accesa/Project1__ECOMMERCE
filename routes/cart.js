const express = require('express');
const router = express.Router();
const cartController = require('./../utils/cart-controller');

//cum pot sa restrang id-ul la un tip anume?
router.get('/:id',(req,res) => {
    const productId = req.params['id'];
    res.send({ 
        isInCart: cartController.isInCart(productId)
    });
})

router.post('/manip',(req,res) => {
    const action = req.body.action;
    const productId = req.body.productId;

    if(action === 'add'){
            cartController.addToCart(productId);
    }else if(action === 'remove'){
            cartController.removeFromCart(productId);
    }

    res.status(200).send('Status: OK');
    
})

router.get('/get/all',(req,res) => {
    const _cart = [];
    cartController.getAll().forEach(elem => _cart.push(elem));
    res.send({
        cart:_cart
    })
})

module.exports = router;