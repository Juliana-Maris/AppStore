
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const MongoInMemory = require('mongo-in-memory');
//const Schema = MongoInMemory.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, "O slug é obrigatório"],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true,
    }]
    //image: {
    // type: String,
    //  required: true,
    // trim: true
    //}, // tags como um array
});

//module.exports = MongoInMemory.model('Product', schema)
module.exports = mongoose.model("Product", schema);
