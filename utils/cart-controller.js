class CartController{
    _cart;
    constructor(){
        this._cart = [];
    }

    /**
     * 
     * @returns a list of the products  id  that are added to cart
     */
    getAll(){
        return this._cart;
    }

    addToCart(productId){
        this._cart.push(productId);

    }

    removeFromCart(productId){
        this._cart  = this._cart.filter(id => id !== productId);
    }

    isInCart(productId){
        return this._cart.find(id => id === productId) !== undefined;
    }




}

module.exports = new CartController();