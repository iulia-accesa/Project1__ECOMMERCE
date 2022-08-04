const axios = require("axios");
const { all } = require("../routes");
const port = 8080;

class ProductsController {
  _products;

  constructor(products) {
    this._products = products;
  }
  fetchProducts() {
    let fs = require("fs");
    let data = fs.readFileSync("./../products.json");
    let aux = [];
    JSON.parse(data).products.forEach((product) =>
      this._products.push(product)
    );
    aux = this.oderByPrice("asc").getAll();
    this._products = [];
    aux.forEach((elem) => this._products.push(elem)); //deepcopy
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
   * @return {ProductsController} in where this.__products is a  sorted list of json objects by price
   */
  oderByPrice(order) {
    const orderDirection = order === "desc" ? -1 : 1;
    return new ProductsController(
      this._products.sort((a, b) => (a.price - b.price) * orderDirection)
    );
  }

  /**
   *
   * @param title {string}
   * @param productList {JSONObjList}
   * @return {ProductsController} in where this.__products is a filtered list of json objects by title
   */
  filterByTitle(title) {
    return new ProductsController(
      this._products.filter((jsonObj) =>
        jsonObj.title.toLowerCase().includes(title)
      )
    );
  }
  /**
   *
   * @param {string} order `asc` or `desc` only
   * @param {string} title
   * @return {ProductsController} in where attribute this.__products is filtered by title and sorted  by order list of json objects if title and order is not undefined
   *                ,ordered `asc` and filtered by title if order is undefined
   *                ,ordered by order if only @param order is defined
   *                ,else return  list sorted by attribute `price` ascending 
   * TO DO: ASK about how to do something like this ex: 
   * const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']; 
   * function filtera(){
	      return this.filter(word => word.length > 6);
        }

          function filterb(){
	          return this.filter(word => word.length < 9);
          }
      return words.filtera().filterb();  //selects words wit length betwen 7 and 8
   */
  orderByPriceFilterByTitle(order, title) {
    if (order && !title) {
      return this.oderByPrice(order);
    } else if (!order && title) {
      return this.filterByTitle(title).oderByPrice("asc");
    } else if (order && title) {
      return this.filterByTitle(title).oderByPrice(order);
    }
    return this.oderByPrice("asc");
  }
}

module.exports = new ProductsController([]);
