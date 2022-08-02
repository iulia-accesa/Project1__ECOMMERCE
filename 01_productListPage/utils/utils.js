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
    console.log("in OrderBy price"+order)

    // Simplified version :)
    const orderDirection = order === 'desc' ? -1 : 1;
    return this._products.sort((a, b) => (a.price - b.price) * orderDirection );

    // let ordered;
    // if (order === 'asc') {
    //   ordered = this._products.sort(priceAscendingComparator);
    // } else {
    //   if (order === 'desc') {
    //     ordered = this._products.sort(priceDescendingComparator);
    //   }
    // }

    // function priceAscendingComparator(item1, item2) {
    //   return item1.price - item2.price;
    // }
    // function priceDescendingComparator(item1, item2) {
    //   return item2.price - item1.price;
    // }

    // return ordered;
  }

   /**
   *
   * @param title {string}
   * @param productList {JSONObjList}
   * @return {list} filtered list of json objects by title
   */
  filterByTitle(title,productList){
      // TODO: do not create a const ... simply return productList.filter(...)
      // also product list is available in this._products
      // also product might need to be sorted after filtering (according to sort criteria)
      const result = productList.filter(jsonObj => jsonObj.title.toLowerCase().includes(title))
      return result;
  }
}

module.exports = new ProductsController();
