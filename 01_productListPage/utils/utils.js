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
      */
      return productList.filter(jsonObj => jsonObj.title.toLowerCase().includes(title))
     
  }
}

module.exports = new ProductsController();
