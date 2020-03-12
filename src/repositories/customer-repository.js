'use strict'

const mongoose = require('mongoose');

var Customer = mongoose.model('Customer');


exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();

}

exports.read = async () => {
    var customer = await Customer.find();
    return customer;
}

exports.readById = async (id) => {
    var customer = await Customer.findOne({
        _id: id
    }, 'title descrition slug price tags');
    return customer;
}

exports.update = async (id, data) => {

    await Customer.findByIdAndUpdate(id,{
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.delete = async (id) => {
    await Customer.findOneAndDelete(id);
} 

exports.authenticate = async (data) => {
    var customer = await Customer.findOne({
        email: data.email,
        password: data.password
    });

    return customer;
}
