const express = require("express");
const ssoService = require('../services/sso.service');

exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        if (!req.body.email || !req.body.password) {
            return res.send({
                status: 400,
                message: 'Error creating',
            });
        }

        const resData = await ssoService.register(req.body);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const resData = await ssoService.login(req.body);
        console.log(resData);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resData = await ssoService.getProfile(userId);
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
        const {userInfo} = req.body;
        const resData = await ssoService.editProfile(userId, userInfo);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
};

exports.sendMail = async (req, res) => {
    try {
        const resData = await ssoService.sendMail(123, 123, 123);
        return res.json(resData);
    } catch (error) {
        console.log(error);
        return res.send({
            status: error.code || 400,
            message: error.message,
        });
    }
}