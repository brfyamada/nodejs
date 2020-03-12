'use strict'

const mongoose = require('mongoose');

var Order = mongoose.model('Order');


exports.create = async (data) => {
    var order = new Order(data);
    await order.save();

}

exports.read = async () => {
    var order = await Order.find();
    return order;
}

exports.readById = async (id) => {
    var order = await Order.findOne({
        _id: id
    }, 'title descrition slug price tags');
    return order;
}

exports.update = async (id, data) => {

    await Order.findByIdAndUpdate(id,{
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.delete = async (id) => {
    await Order.findOneAndDelete(id);
} 
