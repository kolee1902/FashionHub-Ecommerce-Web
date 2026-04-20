const db = require("../models");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { Op, DATE } = require('sequelize');

exports.createProductCate = async(userId, cateName) => {
    const ProductCate = await db.ProductCategories;
    await ProductCate.create({
        id: uuidv4(),
        cateName: cateName,
        createdBy: userId,
    })
    return {
        status: 200,
        message: "create product categories successfully"
    }
};

exports.createProduct = async(userId, dataProd) => {
    const Product = await db.Product;
    await Product.create({
        id: uuidv4(),
        createdBy: userId,
        ...dataProd,
    })
    return {
        status: 200,
        message: "create product successfully"
    }
};

exports.getAllProduct = async (categoryId) => {
    const Product = await db.Product;
    let product;
    if (categoryId == "") {
        product = await Product.findAll(
            {
                where: {
                    deletedAt: null
                }
            }
        );
    }
    else {
        product = await Product.findAll({
            where: {
                cateId: categoryId,
                deletedAt: null
            }
        });
    }
    return {
        status: 200,
        rows: product
    }
}

exports.searchProduct = async (keyword) => {
    const Product = await db.Product;
    keyword = `%${keyword}%`
    const product = await Product.findAll({
        where: {
            name: {
                [Op.like]: keyword
            },
            deletedAt: null
        }
    })
    return {
        status: 200,
        rows: product
    }
}

exports.getListCategory = async() => {
    const ProductCategories = await db.ProductCategories;

    const category = await ProductCategories.findAll();

    return {
        status: 200,
        rows: category
    }
}

exports.addProduct = async(userId, productJson, cateName) => {
    const Product = await db.Product;
    const ProductCategories = await db.ProductCategories;
    
    const PC = await ProductCategories.findOne({
        where: {
            cateName: cateName
        }
    })

    const updatedProductJson = {
        ...productJson,
        id: uuidv4(),
        cateId: PC.id,
        createdBy: userId
    };

    const product = await Product.create(updatedProductJson);

    if (product == null) {
        throw new Error("add product error");
    }

    return {
        status: 200, 
        message: "Add product success"
    }

}


exports.deleteProduct = async(id) => {
    const Product = await db.Product;

    const product = await Product.update(
        {
            deletedAt: new Date(), 
            status: 0
        },
        {
            where: {
                id: id
            }
        }
    )

    if (product == 0) {
        throw new Error ("Delete product fail")
    }

    return {
        status: 200, 
        message: "Delete product success"
    }

}

exports.editProduct = async(id, productJson) => {
    const Product = await db.Product;
    

    const product = await Product.update(productJson,
        {
            where: {
                id: id,
                deletedAt: null
            }
        }
    )

    if (product == 0) {
        throw new Error ("Edit product fail")
    }

    return {
        status: 200, 
        message: "Edit product success"
    }

}