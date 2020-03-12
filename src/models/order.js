'use strict'

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({

    number: {
        type: String,
        required: true,
        trim: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    total: {
        type: Number,
        required: true
    },
    itens: [{
        quantity:{
            type: Number,
            required: true,
            default: 1
        },
        price:{
            type: Number,
            required: true,

        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
        
    }]

});

module.exports = mongoose.model('Order', schema);