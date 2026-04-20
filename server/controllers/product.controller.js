const prodService = require('../services/product.service')

exports.createProductCate = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { cateName } = req.body;
        const resData = await prodService.createProductCate(userId, cateName);
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

exports.createProduct = async (req, res) => {
    try {
        const userId = req.user.userId;
        const dataProduct = req.body;
        const resData = await prodService.createProduct(userId, dataProduct);
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

exports.getAllProduct = async (req, res) => {
    try {
        const { categoryId} = req.body;
        const resData = await prodService.getAllProduct(categoryId);
        console.log(resData);
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

exports.getAllProductNotCheck = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const resData = await prodService.getAllProduct(categoryId);
        console.log(resData);
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

exports.searchProduct = async (req, res) => {
    try {
        const { keyword } = req.body;
        const resData = await prodService.searchProduct(keyword);
        console.log(resData);
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

exports.getListCategory = async (req, res) => {
    try {
        const resData = await prodService.getListCategory();
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

exports.addProduct = async (req, res) => {
    try {
        const userId = req.user.userId
        const {name, describe, price, inventory, cateName, image, brand} = req.body
        const productJson = {
            name, describe, price, inventory, image, brand
        };
        const resData = await prodService.addProduct(userId, productJson, cateName);
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


exports.deleteProduct = async (req, res) => {
    try {
        const userId = req.user.userId
        const {id} = req.body
        const resData = await prodService.deleteProduct(id);
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

exports.editProduct = async (req, res) => {
    try {
        const userId = req.user.userId
        const {id, name, describe, price, inventory, image, brand} = req.body
        const productJson = {
            name, describe, price, inventory, image, brand,
            updatedAt: new Date()
        };
        const resData = await prodService.editProduct(id, productJson);
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