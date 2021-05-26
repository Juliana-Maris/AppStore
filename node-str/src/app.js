'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//aqui ele carrega o mongoose, carrego o Mongo InMemory??
const mongoose = require('mongoose');
//const MongoInMemory = require('mongo-in-memory'); //faço isso?
const config = require('./config')

const app = express();
const router = express.Router();
// aqui  conecta mongoose ao banco na nuvem (não faço nada? api esta rodando!)
mongoose.connect(config.connectionString);

// carregar models
const Product = require("./models/product");
const Customer = require("./models/customer");
const Order = require("./models/order");
// carrega rotas
const indexRoute = require('./routes/indexroute'); // apenas index e não indexroute
const productRoute = require('./routes/productroute');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));
//habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);


module.exports = app;