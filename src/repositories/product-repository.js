'use strict'

const mongoose = require('mongoose');

var Product = mongoose.model('Product');


exports.create = async (data) => {

    var product = new Product(data);
    await product.save();

}

exports.read = async () => {
    var products = await Product.find({
        active: true
    }, 'title descrition slug price tags');
    return products;
}

exports.readById = async (id) => {
    var product = await Product.findOne({
        _id: id,
        active: true
    }, 'title descrition slug price tags');
    return product;
}

exports.update = async (id, data) => {

    await Product.findByIdAndUpdate(id,{
        $set: {
            title: data.title,
            descrition: data.descrition,
            slug: data.slug,
            price: data.price,
            active: data.active,
            tags: data.tags
        }
    });
}

exports.delete = async (id) => {
    await Product.findOneAndDelete(id);
} 
