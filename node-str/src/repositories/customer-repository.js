
'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
}
//cria autenticação de usuario
exports.authenticate = async ({ email, password }) => {
    return Customer.findOne({ email, password });
}
exports.getById = async (id) => {
    return Customer.findById(id);
}


