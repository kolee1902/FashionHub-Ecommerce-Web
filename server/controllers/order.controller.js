const orderService = require("../services/order.service")

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {listItem} = req.body;
        console.log(listItem)
        const resData = await orderService.createOrder(userId, listItem);
        return res.json(resData);
    } 
    catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
}

exports.confirmPayment = async(req, res) => {
    try {
        const userId = req.user.userId;
        const {name, phone, address, price, discountAmount, totalAmount, paymentMethod, discountCode, shippingAddress, notes, orderNo} = req.body;
        const paymentJson = {
            name, phone, address, price, discountAmount, 
            totalAmount, paymentMethod, discountCode, shippingAddress, notes
        };
        const resData = await orderService.confirmPayment(userId, paymentJson, orderNo);
        return res.json(resData);
    } 
    catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.approveTransfer = async(req, res) => {
    try {
        const {orderNo} = req.params;
        const resData = await orderService.approveTransfer(orderNo);
        return res.json(resData);
    } 
    catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.cancelTransfer = async(req, res) => {
    try {
        const {orderNo} = req.params;
        const resData = await orderService.cancelTransfer(orderNo);
        return res.json(resData);
    } 
    catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.getAllOrder = async(req, res) => {
    try {
        const userId = req.user.userId
        const resData = await orderService.getAllOrder(userId);
        return res.json(resData);
    } 
    catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};