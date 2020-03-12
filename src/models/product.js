'use strict'

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
    },
    price: {
            type: Number,
            required: true
    },
    active:{
        type:Boolean,
        default: true
    },
    tags:[
        {
            type: String,
            required: false
        }
    ]

});

module.exports = mongoose.model('Product', schema);