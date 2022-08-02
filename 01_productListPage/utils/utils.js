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
    console.log("in OrderBy price"+order)
    let ordered;
    if (order === 'asc') {
      ordered = this._products.sort(priceAscendingComparator);
    } else {
      if (order === 'desc') {
        ordered = this._products.sort(priceDescendingComparator);
      }
    }

    function priceAscendingComparator(item1, item2) {
      return item1.price - item2.price;
    }
    function priceDescendingComparator(item1, item2) {
      return item2.price - item1.price;
    }

    return ordered;
  }

   /**
   *
   * @param title {string}
   * @param productList {JSONObjList}
   * @return {list} filtered list of json objects by title
   */
  filterByTitle(title,productList){
      const result = productList.filter(jsonObj => jsonObj.title.toLowerCase().includes(title))
      return result;
  }
}

module.exports = new ProductsController();
