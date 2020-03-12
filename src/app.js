'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.connectionString,  
{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true
});


//declarando os models
const product = require('./models/product');
const customer = require('./models/customer');
const order = require('./models/order');


//importando as rotas
const productRoutes = require('./routes/product-route');
const customerRoutes = require('./routes/customer-route');
const orderRoutes = require('./routes/order-route');


const app = express();

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(function(req, res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


//declarando as rotas
app.use('/products', productRoutes);
app.use('/customer',customerRoutes);
app.use('/order',orderRoutes);



module.exports = app;

