


const PORT = 8080;
const get_PRODUCT_DETAIL_PAGE = `http://localhost:8080/products`;
function init(){
    const productId = sessionStorage.getItem('productId');
    axios.get(get_PRODUCT_DETAIL_PAGE + '/' + productId)
    .then(response => response.data)
    .then(htmlString => {
        document.getElementById('container__product').insertAdjacentHTML('beforeend',htmlString);
    })
    
}

init();

