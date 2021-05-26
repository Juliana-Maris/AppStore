
'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({ active: true }, 'title price slug');
    return res;
}
exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug: slug, active: true
    }, 'title description price slug tags');
    return res;
}
exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}
exports.getByTag = async (tag) => {
    return Product.find({
        tags: tag, active: true
    }, 'title description price slug tags');
}
exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}
exports.update = async (id, data) => {
    const { title, description, price, slug } = data

    await Product.findByIdAndUpdate(id, {
        $set: {
            title,
            description,
            price,
            slug
        }
    });
}
exports.delete = async (id) => {
    await Product.findOneAndRemove(id);
}
