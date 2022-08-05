const PORT = 8080;
const get_PRODUCT_DETAIL_PAGE = `http://localhost:${PORT}/products`;
const get_FEW_PRODUCTS_BY_TITLE = `http://localhost:${PORT}/products/similar/5`;
const CHECKOUT_PAGE = `http://localhost:${PORT}/checkout`;
function init(){
    const productId = sessionStorage.getItem('productId');
    const productCategory = sessionStorage.getItem('productCategory');
    axios.get(get_PRODUCT_DETAIL_PAGE + '/' + productId)
    .then(response => response.data)
    .then(htmlString => {
       
        document.getElementById('container__product').insertAdjacentHTML('beforeend',htmlString);
        axios.get(get_FEW_PRODUCTS_BY_TITLE + '?cat=' + productCategory)
        .then(response_1 => response_1.data)
        .then(htmlString_1 => {
                document.querySelector('.container__similar-products').insertAdjacentHTML('beforeend',htmlString_1);
        });
    
    
    })
    
}

function manipulateCartProducts(_action,_productId){
    const post_MANIPULATE_CART = `http://localhost:${PORT}/cart/manip`;
    //http request
    const data = { action : _action,
                  productId : _productId
                };
    fetch(post_MANIPULATE_CART,{
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


init();



document.addEventListener('click', (event) => {
   
    if(event.target.classList.contains('btn__add-to-cart')){
        const productContainer = event.target.closest('.container__product-details');
        const productId = productContainer.getAttribute('data-product-id').split('_')[1];
        manipulateCartProducts('add',productId);
        productContainer.setAttribute('data-product-in-cart','true');
    }
    else if(event.target.classList.contains('btn__remove-from-cart')){
        const productContainer = event.target.closest('.container__product-details');
        const productId = productContainer.getAttribute('data-product-id').split('_')[1];
        manipulateCartProducts('remove',productId);
        productContainer.setAttribute('data-product-in-cart','false');
    }
    if(event.target.classList.contains('header__cart-symbol')){
            
            location.replace(CHECKOUT_PAGE);
    }
})

