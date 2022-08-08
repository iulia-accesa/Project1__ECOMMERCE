const PORT = 8080;
const PRODUCT_DETAIL_PAGE_URL = `http://localhost:${PORT}/product-details`;
const MANIPULATE_CART = `http://localhost:${PORT}/cart/manip`;
class ActionsInitializator {
  constructor() {}

  
  initAllActions() {
    
    document.addEventListener('click', (event) => {
      if(event.target.closest('#container__products-page') !== null){
        this.handleProductBoxButtonsClicked(event);
      }else if(event.target.closest('#beforeProductsSection') !== null){
        this.handleSectionBeforeProductsClick(event);
      }
  
    });

    this.initSearchBarActions();
  }


  manipulateCartProducts(_action,_productId){
        //http request
        const data = { action : _action,
                      productId : _productId
                    };
        fetch(MANIPULATE_CART,{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then((response) => {
            console.log('Success:', response);
          })
          .catch((error) => {
              console.error('Error:', error);
            });
        
  } 


  handleProductBoxButtonsClicked(event) {
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

  

  handleSectionBeforeProductsClick(event) {
    const optionsContainer = document.querySelector(".dropdown__options");
    if (
      event.target.classList.contains("down__arrow") ||
      event.target.id === "sorting-option"
    ) {
      if (optionsContainer.classList.contains("hidden")) {
        optionsContainer.classList.remove("hidden");
      } else {
        optionsContainer.classList.add("hidden");
      }
    } else {
      if (event.target.classList.contains("order__option")) {
        const nowSorting = document.getElementById("sorting-option");
        const sortingOption = event.target.getAttribute("data-sort");
        const sortingOptionComp = document.getElementById("sorting-option");
        sortingOptionComp.innerHTML = event.target.innerHTML;

        getProductsSorted(sortingOption);

        optionsContainer.classList.add("hidden");
        nowSorting.setAttribute("data-now-sorting", sortingOption);
      }
    }

    function getProductsSorted(order) {
      const title = document
        .getElementById("search-bar-products-title")
        .value.toLowerCase();
      let GET_PRODUCTS_ORDERED_BY = `http://localhost:${PORT}/products`;

      if (order === "asc") {
        GET_PRODUCTS_ORDERED_BY += "?order=asc";
      } else {
        if (order === "desc") {
          GET_PRODUCTS_ORDERED_BY += "?order=desc";
        }
      }
      if (title !== "search here") {
        GET_PRODUCTS_ORDERED_BY += "&title=" + title;
      }
      axios.get(GET_PRODUCTS_ORDERED_BY).then((response) => {
        const htmlString = response.data;
        document.querySelector("#container__products-page").innerHTML = "";
        document
          .getElementById("container__products-page")
          .insertAdjacentHTML("beforeend", htmlString);
      });
    }
  }


  initSearchBarActions() {
    let typingTimer;
    const doneTypingInterval = 500; //the interval the user stops using the keyboard
    const input = document.getElementById("search-bar-products-title");
    const searchOutlineIcon = document.querySelector(
      ".products__search-outline--container"
    );

    input.addEventListener("keyup", function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(userDoneTyping, doneTypingInterval);
    });

    input.addEventListener("keydown", function () {
      clearTimeout(typingTimer);
    });
    function userDoneTyping() {
      const sortingOption = document
        .getElementById("sorting-option")
        .getAttribute("data-now-sorting");
      const title = input.value.toLowerCase();
      const GET_PRODUCTS_FILTER_ORDER_BY =
        `http://localhost:${PORT}/products` +
        "?" +
        "order=" +
        sortingOption +
        "&" +
        "title=" +
        title;
      axios.get(GET_PRODUCTS_FILTER_ORDER_BY).then((response) => {
        const htmlString = response.data;
        document.querySelector("#container__products-page").innerHTML = "";
        document
          .getElementById("container__products-page")
          .insertAdjacentHTML("beforeend", htmlString);
      });
    }

   
  }
}
