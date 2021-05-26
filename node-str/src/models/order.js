
'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const MongoInMemory = require('mongo-in-memory');
//const Schema = MongoInMemory.Schema;
const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ["created", "done"],
        default: "created"
    },
    // criar array items evita ter que criar uma nova coleção
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
        }, // desnecessario ter o preço aqui, pq já existe no product
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    }],
});
//module.exports = MongoInMemory.model('Product', schema)
module.exports = mongoose.model("Order", schema);
// order e itens vai ficar juntos aqui, mas podia fazer em files separados
