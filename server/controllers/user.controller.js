const express = require("express");
const userService = require('../services/user.service');

exports.getAllUsers = async (req, res) => {
    try {

        const resData = await userService.getAllUsers();
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const resData = await userService.deleteUser(userId);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resData = await userService.editProfile(userId, req.body);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};


exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const resData = await userService.getUserProfile(userId);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.editUserRole = async (req, res) => {
    try {
        const {userId, role} = req.body
        const resData = await userService.editUserRole(userId, role);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};