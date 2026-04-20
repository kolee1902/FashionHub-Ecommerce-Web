const cartService = require("../services/cart.service")

exports.addCartItem = async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.user.userId;
        console.log(productId, quantity, userId)
        const resData = await cartService.addCartItem(userId, productId, quantity);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.removeCartItem = async (req, res) => {
    try {
        const {cartItemId} = req.body;
        console.log(cartItemId)
        const resData = await cartService.removeCartItem(cartItemId);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.listCartItem = async (req, res) => {
    try {
        const userId = req.user.userId
        const resData = await cartService.listCartItem(userId);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};