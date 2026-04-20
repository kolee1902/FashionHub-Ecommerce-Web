const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const db = require("../models");
const { use } = require("../routers/Posts");
const { Op } = require("sequelize");
const nodeMailer = require('nodemailer')

exports.register = async (userJson) => {
    console.log(userJson);
    const User = await db.User;
    const Cart = await db.Cart;

    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(userJson.email);
    if (!userJson.username || !userJson.password || !userJson.email) {
        throw new Error("Input invalid")
    }
    if (!isCheckEmail) {
        throw new Error("Email invalid")
    }
    // console.log(userJson.email, userJson.username);
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email: userJson.email },
            { username: userJson.username }]
        }
    });
    if (user) {
        console.log("Existed user");
        return {
            status: 400,
            message: 'Account already exist!'
        }
    } else {
        console.log("new user");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userJson.password, salt)
    const userId = uuidv4();

    const body = {
        email: userJson.email,
        username: userJson.username,
        name: userJson.name,
        tel: userJson.tel,
        // role: userJson.role,
        password: hashed
    };

    await User.create({
        userId: userId,
        tokenId: uuidv4(),
        ...body,
    });

    await Cart.create({
        id: uuidv4(),
        userId: userId
    })

    return {
        status: 200,
        message: 'User created!',
    };
};

exports.login = async (userJson) => {
    const User = await db.User;
    const user = await User.findOne({
        where: {
            username: userJson.username,
        }
    });
    if (!user) {
        throw new Error("username invalid");
    }
    const validPassword = await bcrypt.compare(userJson.password, user.password);

    if (!validPassword) {
        throw new Error("password invalid");
    }
    if (user && validPassword) {
        const accessToken = jwt.sign({
            userId: user.userId,
            email: user.email,
            role: user.role
        },
            "secretKey",
            { expiresIn: "1d" }
        )

        return {
            status: 200,
            data: user,
            accessToken
        }
    }
};

exports.getProfile = async (userId) => {
    const User = await db.User;

    const user = await User.findOne({
        where: {
            userId: userId
        }
    })

    if (user == null) {
        throw new Error('User null');
    }

    return {
        status: 200,
        row: user
    }
}

exports.editProfile = async (userId, userInfo) => {
    const User = await db.User;
    const user = await User.update(
        {
            name: userInfo?.name
        },
        {
            where: {
                userId: userId
            }
        })

};

exports.sendMail = async (emailTo, subject, html) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fitproject81@gmail.com',
            pass: 'qmmh tjbt dbgw vofz',
        },
    })
    return await transporter.sendMail({
        from: 'FashionHub <FitProject>',
        to: emailTo,
        subject: subject,
        html: html
    })
}