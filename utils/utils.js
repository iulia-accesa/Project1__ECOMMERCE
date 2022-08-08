
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

 filterByCategory(category){
    return new ProductsController(
      this._products.filter((jsonObj) =>
        jsonObj.category.toLowerCase().includes(category)
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


  findById(id){
  
    return this._products.find(product => product.id === Number(id));
  }

  
}

module.exports = new ProductsController([]);
