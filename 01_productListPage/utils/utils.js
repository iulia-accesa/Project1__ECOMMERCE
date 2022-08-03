const axios = require("axios");
class ProductsController {
  _products;

  constructor() {
    
    let allProducts = [];
    axios.get("http://localhost:3000/products/json").then((response) => {
      const responseProducts = response.data.products;
      responseProducts.forEach((element) => {
        allProducts.push(element);
      });
    });
    //QUESTION: In the set-up and guidelines i says:When importing the json file, you must treat that as a http request and use the fetch method.
    //I thought that we have to threat this as an actual http get request , what should i do then? 

    // Answer: we are at server level here, so JSON file cand be handled with import rather then rezuesting and endpoint that returns a data from the JSON file.
    // Consider the JSON file as a rudimentary DB

    // move this to axios callback or load the product list sync from directly JSON file
    this._products = allProducts;
    this._products = this.oderByPrice('asc');
  }

  getAll() {
    return this._products;
  }

  setProducts(newProducts) {
    this._products = newProducts;
  }
  /**
   *
   *
   * @return {list} sorted list of json objects by price
   */
  oderByPrice(order) {
   
    const orderDirection = order === 'desc' ? -1 : 1;
    return this._products.sort((a, b) => (a.price - b.price) * orderDirection );
  }

   /**
   *
   * @param title {string}
   * @param productList {JSONObjList}
   * @return {list} filtered list of json objects by title
   */
  filterByTitle(title,productList){
      // TODO: 
      // also product list is available in this._products
      // also product might need to be sorted after filtering (according to sort criteria)

      //QUESTION regarding the to-dos
      /*
      * Yes,indeed the product list is available in this._products but i did not want to use it because i did not wanted to make this function depend on that list( i thought about doing
      this too to the `orderPyPrice` function but i ecountered a problem there and i could not do it)
      Also,i want to try  make this class functions respect the  single responsability principle 
      
      In my  view this.__products should keep only the products list without any filters
      Please,let me what do you think 
      :)

      Answer: this._products will always keep the raw (unsorted/unfiltered) list of products. Your methods (order/filter) will return a NEW list (array) of products. this._products.sort(...) or this._products.filter(...) always creates a new array and does not modifiy the initial array (this._products). So methods are pure.
      */
      return productList.filter(jsonObj => jsonObj.title.toLowerCase().includes(title))
     
  }
}

module.exports = new ProductsController();
