const { Op } = require('sequelize');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.addCartItem = async(userId, productId, quantity) => {
    const Cart = await db.Cart;
    const CartItem = await db.CartItem;
    const Product = await db.Product;

    const product = await Product.findOne({
        where: {
            id: productId
        }
    });

    if (product == null) {
        throw new Error("Product null")
    }

    const cart = await Cart.findOne({
        where: {
            userId: userId
        }
    });
    
    if (cart == null) {
        throw new Error("Cart null")
    }

    const cartItem = await CartItem.create({
        id: uuidv4(),
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
        price: product.price
    });
    
    let newTotalQuantity = cart?.totalQuantity + cartItem.quantity;
    let newTotalPrice = cart?.totalPrice + (cartItem.quantity * cartItem.price);

    await Cart.update({
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
    }, {
        where: {
            id: cart.id
        }
    });
    

    return {
        status: 200,
        message: "Add item success"
    }
};


exports.removeCartItem = async(cartItemId) => {
    const Cart = await db.Cart;
    const CartItem = await db.CartItem;

    const cartItem = await CartItem.findOne({
        where: {
            id: cartItemId,
            deletedAt: null
        }
    });

    if (cartItem == null) {
        throw new Error("Cart Item error");
    }

    const cart = await Cart.findOne({
        where: {
            id: cartItem.cartId
        }
    })
    if (cart == null) {
        throw new Error("Cart null")
    }

    let newTotalQuantity = cart?.totalQuantity - cartItem.quantity;
    let newTotalPrice = cart?.totalPrice - (cartItem.quantity * cartItem.price);
    
    await Cart.update({
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
    }, 
    {
        where: {
            id: cart.id
        }
    });


    await CartItem.update({
        deletedAt: new Date()
    },  
    {
        where: {
            id: cartItem.id
        }
    })

    return {
        status: 200,
        message: "Remove item success"
    }
};


exports.listCartItem = async(userId) => {
    const Cart = await db.Cart;
    const CartItem = await db.CartItem;
    const Product = await db.Product;

    CartItem.belongsTo(Product, {foreignKey: 'productId'});

    const cart = await Cart.findOne({
        where: {
            userId: userId
        }
    });

    if (cart == null) {
        throw new Error("Cart null")
    }

    const cartItem = await CartItem.findAll({
        attributes: ['id', 'quantity', 'price'],
        include: [
            {
                model: Product,
                attributes: ['name', 'describe', 'brand', 'image']
            }
        ],
        where: {
            cartId: cart.id,
            deletedAt: null
        }
    });

    if (cartItem == null) {
        throw new Error("Cart Item null")
    }

    return {
        rows: cartItem
    }
};