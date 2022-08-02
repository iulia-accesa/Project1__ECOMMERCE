const express = require('express')
const app = express()
const port = 8080
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('welcome to my webserver ');
})

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '/01_productListPage-Main/01_index.html'));
})

app.get('/products/:id', (req, res) => {
  let productId = req.params['id'];
  console.log(productId);
  res.sendFile(path.join(__dirname, '/02_productDetailPage/02_index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

