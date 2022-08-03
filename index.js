const path = require('path');
const express = require('express')
const port = 8080

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const myIndexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', myIndexRouter);
app.use('/products', productsRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

