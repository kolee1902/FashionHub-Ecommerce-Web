const jwt = require('jsonwebtoken')

exports.checkAuthAndToken = async (req, res, next) => {
    const token = req.headers.token;
    console.log(req.headers);
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, "secretKey", (err, user) => {
            if (err) {
                res.status(403).json("token is not valid");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You're not authenticated")
    }
};

exports.checkTokenAdmin = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, "secretKey", (err, user) => {
            if (err) {
                res.status(403).json("token is not valid");
            }
            if (user.role == 'admin') {
                req.user = user;
                next();
            }
            else {
                res.status(403).json("You're not admin");
            }
        });
    }
    else {
        res.status(401).json("You're not authenticated")
    }
};