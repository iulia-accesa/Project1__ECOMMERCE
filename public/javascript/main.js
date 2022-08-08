console.log("Start from main.js ----");
let initActions = new ActionsInitializator();
initActions.initAllActions();


function   manipulateCartProducts(_action,_productId){
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

  