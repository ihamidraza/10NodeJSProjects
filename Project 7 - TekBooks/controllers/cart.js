'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');




module.exports = function (router) {



    router.get('/', function (req, res) {

        // Get cart from the session
        var cart = req.session.cart,
            displayCart = {
                item: [],
                total: 0
            },
            total = 0;

        // Get total
        for (var item in cart) {
            displayCart.item.push(cart[item]);
            total += (cart[item].qty * cart[item].price);
        };
        displayCart.total = total;

        // Render cart
        res.render('cart/index',{
            cart: displayCart

        });

    });
    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;
        console.log('cart:'+cart);
        Book.findOne({_id: req.params.id}, function(err, book){
            if(err){
                console.log(err);
            }
            if(cart[req.params.id]){
                cart[req.params.id].qty++;
            }
            else{
                cart[req.params.id] = {
                    item: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }
            res.redirect('/cart')
        });
    });
};
