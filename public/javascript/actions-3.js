

const PORT = 8080;
const GET_ALL_CART_PRODUCTS = `http://localhost:${PORT}/cart/products/all`;
const POST_CART_PRODUCTS = `http://localhost:${PORT}/products/in-cart`;
function init() {
  const cartSection = document.querySelector(".container__cart-products--checkout");

  axios
    .get(GET_ALL_CART_PRODUCTS)
    .then((response) => response.data.cart)
    .then((_productsId) => {
      axios
        .post(POST_CART_PRODUCTS, {
          productsId: _productsId,
        })
        .then((response1) => response1.data)
        .then((data) => {
          cartSection.insertAdjacentHTML("beforeend", data.htmlString);
          document.getElementById('cartTotal').innerHTML = data.totalProductsCost;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

init();
