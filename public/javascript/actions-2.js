const PORT = 8080;
const PRODUCT_DETAIL_PAGE = `http://localhost:${PORT}/products`;
const FEW_PRODUCTS_BY_TITLE = `http://localhost:${PORT}/products/similar/5`;
const CHECKOUT_PAGE = `http://localhost:${PORT}/checkout`;
const MANIPULATE_CART = `http://localhost:${PORT}/cart/manip`;


function handleProductBoxButtonsClicked(event) {
  const productContainer = event.target.closest('.product__box');
  const productId = productContainer.getAttribute('id').split('_')[1];
  console.log(event.target);
  if (event.target.classList.contains('button')) {
    const cartBtnsContainer = event.target.closest(
      '.product__box--buttons-container'
    );
    const productContainer = event.target.closest('.product__box');
    const isAddedToCart = productContainer.getAttribute(
      'data-product-in-cart'
    );
    if (isAddedToCart === 'false') {
      
      productContainer.setAttribute('data-product-in-cart', 'true');
      //request for cart controller to add to cart
      this.manipulateCartProducts('add',productId);
    } else {
      if (isAddedToCart === 'true') {
        productContainer.setAttribute('data-product-in-cart', 'false');
         //request for cart controller to remove from cart
         this.manipulateCartProducts('remove',productId);
      }
    }
  } else if (event.target.classList.contains('product__box--image')) {
    const productBox = productContainer.getAttribute('data-product-category');
    sessionStorage.setItem('productId',productId);
    sessionStorage.setItem('productCategory',productBox);
    location.replace(PRODUCT_DETAIL_PAGE_URL);
  }
}


function init() {
  const productId = sessionStorage.getItem("productId");
  const productCategory = sessionStorage.getItem("productCategory");
  axios
    .get(PRODUCT_DETAIL_PAGE + "/" + productId)
    .then((response) => response.data)
    .then((htmlString) => {
      document
        .getElementById("container__product")
        .insertAdjacentHTML("beforeend", htmlString);
      axios
        .get(FEW_PRODUCTS_BY_TITLE + "?cat=" + productCategory)
        .then((response_1) => response_1.data)
        .then((htmlString_1) => {
          document
            .querySelector(".container__similar-products")
            .insertAdjacentHTML("beforeend", htmlString_1);
        });
    });

    document.addEventListener('click', (event) => {
      if(event.target.closest('.product__box') !== null){
        handleProductBoxButtonsClicked(event);
      }
    });
}

function manipulateCartProducts(_action, _productId) {
  const data = { action: _action, productId: _productId };
  fetch(MANIPULATE_CART, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    console.log("Success:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}

init();

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn__add-to-cart")) {
    const productContainer = event.target.closest(
                              ".container__product-details"
                              );
    const productId = productContainer
                      .getAttribute("data-product-id")
                      .split("_")[1];
    manipulateCartProducts("add", productId);
    productContainer.setAttribute("data-product-in-cart", "true");
  } else if (event.target.classList.contains("btn__remove-from-cart")) {
    const productContainer = event.target.closest(
                                  ".container__product-details"
                              );
    const productId = productContainer
                      .getAttribute("data-product-id")
                      .split("_")[1];
    manipulateCartProducts("remove", productId);
    productContainer.setAttribute("data-product-in-cart", "false");
  }
  if (event.target.classList.contains("header__cart-symbol")) {
    location.replace(CHECKOUT_PAGE);
  }
});
