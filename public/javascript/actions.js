const currentRunningOnPort = 8080;
const PRODUCT_DETAIL_PAGE_URL = `http://localhost:${currentRunningOnPort}/products`;
class ActionsInitializator {
  constructor() {}

  initAllActions() {
    this.initProductBoxActions();
    this.initProductListPageActions();
    this.initSearchBarActions();
  }

  initProductBoxActions() {
    
    const productsContainer = document.getElementById(
      "container__products-page"
    );
    productsContainer.addEventListener("click", handleProductBoxButtonsClicked);

    function handleProductBoxButtonsClicked(event) {
      if (event.target.classList.contains("button")) {
        const cartBtnsContainer = event.target.closest(
          ".product__box--buttons-container"
        );
        const productContainer = event.target.closest(".product__box");
        const isAddedToCart = productContainer.getAttribute(
          "data-product-in-cart"
        );
        if (isAddedToCart === "false") {
          productContainer.setAttribute("data-product-in-cart", "true");
        } else {
          if (isAddedToCart === "true") {
            productContainer.setAttribute("data-product-in-cart", "false");
          }
        }
      }
        else if(event.target.classList.contains('product__box--image')){
          const productContainer = event.target.closest(".product__box");
          const productId = productContainer.getAttribute('id').split('_')[1];
          location.replace(PRODUCT_DETAIL_PAGE_URL + '/' + productId);
        }


    }
  }

  initProductListPageActions() {
    const beforeProductsSection = document.getElementById(
      "beforeProductsSection"
    );
    beforeProductsSection.addEventListener("click", handleSectionClick);

    function handleSectionClick(event) {
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
          const nowSorting = document.getElementById('sorting-option');
          const sortingOption = event.target.getAttribute("data-sort");
          const sortingOptionComp = document.getElementById("sorting-option");
          sortingOptionComp.innerHTML = event.target.innerHTML;
          
          getProductsSorted(sortingOption);


          optionsContainer.classList.add("hidden");
          nowSorting.setAttribute('data-now-sorting',sortingOption);
        }
      }

      function getProductsSorted(order) {
        const title = document.getElementById('search-bar-products-title').value.toLowerCase();
        let GET_PRODUCTS_ORDERED_BY = "http://localhost:3000/products";

        if (order === "asc") {

          GET_PRODUCTS_ORDERED_BY += '?order=asc';
         
        } else {
          if (order === "desc") {
            GET_PRODUCTS_ORDERED_BY += '?order=desc';
          }
        }
        if(title !== "search here"){
          GET_PRODUCTS_ORDERED_BY += '&title=' + title;
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
  }

  initSearchBarActions(){
    let typingTimer;
    const doneTypingInterval = 500;//the interval the user stops using the keyboard
    const input = document.getElementById('search-bar-products-title');
    const searchOutlineIcon = document.querySelector('.products__search-outline--container');


    input.addEventListener('keyup',function(){
              clearTimeout(typingTimer);
              typingTimer = setTimeout(userDoneTyping,doneTypingInterval);
           });

    
    input.addEventListener('keydown',function(){
        clearTimeout(typingTimer);
    });
    function userDoneTyping(){
          
          const sortingOption  = document.getElementById('sorting-option').getAttribute('data-now-sorting');
          const title = input.value.toLowerCase();
          const GET_PRODUCTS_FILTER_ORDER_BY = 'http://localhost:3000/products' + '?' +'order=' + sortingOption + '&' + 'title=' + title;
          axios.get(GET_PRODUCTS_FILTER_ORDER_BY)
          .then((response) => {
            const htmlString = response.data;
            document.querySelector("#container__products-page").innerHTML = "";
            document
              .getElementById("container__products-page")
              .insertAdjacentHTML("beforeend", htmlString);
          });
      }


    searchOutlineIcon.addEventListener('click',function(event){
      
        const searchBar = document.querySelector('.products__search-bar');
        let currentWidth = window.innerWidth;
        console.log(currentWidth )
       
        if(currentWidth > 319 && currentWidth < 1301){
         searchBar.style.display = 'grid';
          
        }
        
    });

    window.addEventListener('scroll',function(event){
      const searchBar = document.querySelector('.products__search-bar');
      let currentWidth = window.innerWidth;
      if(currentWidth > 319 && currentWidth < 1301){
        searchBar.style.display = 'none';
         
       }
    }

    )
    window.addEventListener('resize',function(event){
      const searchBar = document.querySelector('.products__search-bar');
      let currentWidth = window.innerWidth;
      if(currentWidth > 1300)
        searchBar.style.display = 'grid';
        if(currentWidth <= 1300){
          searchBar.style.display = 'none'
        }
    })


  }

}
