'use strict'

var mongoose = require('mongoose');

var bookModel = function () {
    var bookSchema = mongoose.Schema({
        title: String,
        description: String,
        category: String,
        author: String,
        publisher: String,
        price: Number,
        cover: String
    });
    // Schema text
    bookSchema.methods.truncText = function (length) {
        return this.description.substring(0, length);

    }

    return mongoose.model('Book', bookSchema);
};

module.exports = new bookModel();
