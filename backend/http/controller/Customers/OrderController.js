const { response } = require('express');
const Order = require('../../../models/order')
const moment = require('moment')

const OrderController = () => {

    return {
        store(req,res) {
            //! validate request 
            const {phone,address} = req.body;
            if(!phone || !address) {
                req.flash('error', 'All fields must be required');
            }
            const order = new Order({
                customerID  : req.user._id,
                items : req.session.cart.items,
                phone : phone,
                address : address
            })
             
            order.save().then(result => { 
                req.flash('success', 'order placed successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err => { 
                req.flash('error', 'something went wrong')
                return res.redirect('/cart')
            });
        },
        async index(req,res) {
            const order = await Order.find({ customerID : req.user._id});
            res.render('customer/orders',{orders : order,moment:moment},null,{sort : {'createdAt' : -1}})
        }
    }
}

module.exports = OrderController