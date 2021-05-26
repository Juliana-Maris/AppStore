
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const MongoInMemory = require('mongo-in-memory');
//const Schema = MongoInMemory.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});
//module.exports = MongoInMemory.model('Product', schema)
module.exports = mongoose.model("Customer", schema);