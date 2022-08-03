const axios = require("axios");
const { all } = require("../routes");
const port = 8080;

class ProductsController {
  _products;

  constructor() {
    let fs = require("fs");
    let data = fs.readFileSync("./../products.json");

    this._products = [];
    JSON.parse(data).products.forEach((product) =>
      this._products.push(product)
    );
    this._products = this.oderByPrice("asc");
  }

  getAll() {
    
    return all;
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
    console.log(this._products[0]);
    const orderDirection = order === "desc" ? -1 : 1;
    // this._products = this._products.sort((a, b) => (a.price - b.price) * orderDirection);
    return this;
  }

  /**
   *
   * @param title {string}
   * @param productList {JSONObjList}
   * @return {list} filtered list of json objects by title
   */
  filterByTitle(title) {
    this._products =  this._products.filter((jsonObj) =>
      jsonObj.title.toLowerCase().includes(title)
    );
    return this;
  }
  /**
   *
   * @param {string} order `asc` or `desc` only
   * @param {string} title
   * @return {list} filtered by title and sorted  by order list of json objects if title and order is not undefined
   *                ,ordered `asc` and filtered by title if order is undefined
   *                ,ordered by order if only @param order is defined
   *                ,else return  list sorted by attribute `price` ascending 
   * 
   */
  orderByPriceFilterByTitle(order, title) {

    if (order && !title) {
      return this.oderByPrice(order);
    } else if (!order && title) {
      return this.filterByTitle(title).oderByPrice('asc');
    } else if (order && title) {
      return this._products.filterByTitle(title).oderByPrice(order);
    }
    return this.oderByPrice('asc');
  }
}

module.exports = new ProductsController();
