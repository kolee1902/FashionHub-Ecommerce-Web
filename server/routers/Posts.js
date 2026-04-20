const express = require("express");
const { Posts } = require('../models');
const sso = require('../controllers/sso.controller')
const userRight = require('../controllers/user.controller')
const product = require('../controllers/product.controller')
const cart = require('../controllers/cart.controller')
const order = require('../controllers/order.controller')

const middleware = require('../middlewares/middlewares')
//const {User} = require('../models');
const db = require('../models');

const routers = express.Router();

//SSO Auth
routers.post('/register', sso.register);
routers.post('/login', sso.login);
routers.get('/get-profile', middleware.checkAuthAndToken, sso.getProfile);
routers.post('/sendmail', sso.sendMail)


//USER
routers.get('/get-all-users', middleware.checkTokenAdmin, userRight.getAllUsers)
routers.delete('/delete-user/:id', middleware.checkTokenAdmin, userRight.deleteUser)
routers.post('/user/edit-profile', middleware.checkAuthAndToken, userRight.editProfile)
routers.get('/user/profile/:id', middleware.checkAuthAndToken, userRight.getUserProfile)
routers.post('/user/edit-user-role', middleware.checkTokenAdmin, userRight.editUserRole)


//PRODUCT
routers.post('/product/create-product-cate', middleware.checkTokenAdmin, product.createProductCate)
routers.post('/product/create-product', middleware.checkTokenAdmin, product.createProduct)
routers.post('/product/get-all-product', middleware.checkAuthAndToken, product.getAllProduct)
routers.post('/product/get-all-product-not-check', product.getAllProduct)
routers.post('/product/search-product', product.searchProduct)
routers.get('/product/get-all-category', middleware.checkAuthAndToken, product.getListCategory)
routers.post('/product/add-product', middleware.checkTokenAdmin, product.addProduct)
routers.post('/product/delete-product', middleware.checkTokenAdmin, product.deleteProduct)
routers.post('/product/edit-product', middleware.checkTokenAdmin, product.editProduct)

//CART
routers.post('/cart/add-item', middleware.checkAuthAndToken, cart.addCartItem)
routers.post('/cart/remove-item', middleware.checkAuthAndToken, cart.removeCartItem)
routers.post('/cart/list-item', middleware.checkAuthAndToken, cart.listCartItem)

//ORDER
routers.post('/order/create-order', middleware.checkAuthAndToken, order.createOrder)
routers.post('/order/confirm-payment', middleware.checkAuthAndToken, order.confirmPayment)
routers.get('/payment/approve/:orderNo', order.approveTransfer)
routers.get('/payment/cancel/:orderNo', order.cancelTransfer)
routers.get('/order/get-all-order', middleware.checkAuthAndToken, order.getAllOrder)



module.exports = routers