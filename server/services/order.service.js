const db = require('../models')
const { Op, DATE } = require('sequelize')
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('../services/sso.service')

exports.createOrder = async (userId, listItem) => {
    const Order = await db.Order;
    const Cart = await db.Cart;
    const CartItem = await db.CartItem

    const cart = await Cart.create({
        id: uuidv4(),
        userId: userId
    })

    let totalQuantity = 0;
    let totalPrice = 0;
    for (let item of listItem) {
        await CartItem.create({
            id: uuidv4(),
            cartId: cart.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        });
        totalQuantity += item.quantity
        totalPrice += item.price * item.quantity
    }

    await Cart.update({
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
    }, {
        where: {
            id: cart.id
        }
    })

    const cartUpdated = await Cart.findOne({
        where: {
            id: cart.id
        }
    })

    const currentTime = new Date();
    const timestamp = currentTime.getTime();
    let orderNo = `FH${timestamp}`

    const order = await Order.create({
        id: uuidv4(),
        orderNo: orderNo,
        userId: userId,
        cartId: cartUpdated.id,
        totalAmount: cartUpdated.totalPrice,
        status: 1
    })

    return {
        status: 200,
        message: "Order success",
        orderNo: order.orderNo
    }
};

exports.confirmPayment = async (userId, paymentJson, orderNo) => {
    const Payment = await db.Payment;
    const User = await db.User;

    const payment = await Payment.create({
        id: uuidv4(),
        userId: userId,
        orderNo: orderNo
    })

    await Payment.update(paymentJson,
        {
            where: {
                id: payment.id,
                deletedAt: null
            }
        })

    const user = await User.findOne({
        where: {
            userId: userId
        }
    })

    const html = `<!DOCTYPE html>
                <html lang="en" style="font-family: Helvetica, Arial, sans-serif;">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                </head>
                <body style="color: #121926;">

                <div class="content" style="color: #121926; padding-left: 70px; margin-bottom: 20px;"><strong>Name: </strong>${paymentJson.name}</div>
                <div class="content" style="color: #121926; padding-left: 70px; margin-bottom: 20px;"><strong>Address: </strong>${paymentJson.address}</div>
                <div class="content" style="color: #121926; padding-left: 70px; margin-bottom: 20px;"><strong>Telephone: </strong>${paymentJson.phone}</div>
                <div class="content" style="color: #121926; padding-left: 70px; margin-bottom: 20px;"><strong>Notes: </strong>${paymentJson.notes}</div>
                <div class="content" style="color: #121926; padding-left: 70px; margin-bottom: 20px;"><strong>Payment Method: </strong>${paymentJson.paymentMethod}</div>

                <div class="payment_approve" style="margin-left: 24px; margin-right: 24px; padding: 24px;">
                <div class="pay_content" style="display: flex; margin-left: -16px; margin-right: -16px;">
                <div style="width: 70%; padding-left: 16px; padding-right: 16px;">
                    
                    <div class="payment" style="position: relative; border-radius: 5px; padding: 20px; border: 2px solid #e9ecef; margin-bottom: 20px;">
                        <div class="payment_label" style="position: absolute; top: -16px; left: 32px; padding: 8px; z-index: 1; background-color: #fff; font-weight: 600; font-size: 16px;">Payment</div>

                        <div class="payment_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 80%;">Subtotal</div>
                            <div class="result_value" style="font-weight: bolder;">${paymentJson.price}đ</div>
                        </div>
                        <div class="payment_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 80%;">Discount</div>
                            <div class="result_value" style="font-weight: bolder;">${paymentJson.discountAmount}đ</div>
                        </div>
                        <div class="payment_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 80%;">Total</div>
                            <div class="result_value" style="font-weight: bolder;">${paymentJson.totalAmount}đ</div>
                        </div>
                        <hr class="line" style="margin-bottom: 12px!important; box-sizing: content-box; height: 0; overflow: visible;">
                        <div class="payment_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 80%;">User Paid</div>
                            <div class="result_value" style="font-weight: bolder;">${paymentJson.totalAmount}đ</div>
                        </div>
                    </div>
                </div>

                <div class="content_right" style="width: 30%; position: relative; padding-left: 16px; padding-right: 16px;">
                    <div class="user" style="position: relative; border-radius: 5px; padding: 20px; border: 2px solid #e9ecef; margin-bottom: 20px;">
                        <div class="user_label" style="position: absolute; top: -16px; left: 32px; padding: 8px; z-index: 1; background-color: #fff; font-weight: 600; font-size: 16px;">User</div>

                        <div class="user_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 50%;">User Name</div>
                            <div class="result_value" style="font-weight: bolder;">${user.username}</div>
                        </div>
                        <div class="user_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 50%;">Name</div>
                            <div class="result_value" style="font-weight: bolder;">${user.name}</div>
                        </div>
                        <div class="user_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 50%;">Email</div>
                            <div class="result_value" style="font-weight: bolder;">${user.email}</div>
                        </div>
                        <div class="user_item" style="display: flex; align-items: center; margin-bottom: 16px;">
                            <div class="result_label" style="width: 50%;">Phone</div>
                            <div class="result_value" style="font-weight: bolder;">${user.tel}</div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                <div style="margin-left: 50px;">
                <h1>Approve Order #${payment.orderNo} </h1>
                <p style="margin: 40px 0 0;text-align:left">
                <a href="http://localhost:3001/api/payment/approve/${payment.orderNo}" 
                style="display:inline-block;text-decoration:none;background:#10a37f;border-radius:3px;color:white;font-family:Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:400;padding:12px 20px 11px;margin-right:60px; width: 80px; height: 25px; text-align: center;" target="_blank">
                    APPROVE
                </a>
                <a href="http://localhost:3001/api/payment/cancel/${payment.orderNo}" 
                style="display:inline-block;text-decoration:none;background:#b11c1c;border-radius:3px;color:white;font-family:Helvetica,sans-serif;font-size:16px;line-height:24px;font-weight:400;padding:12px 20px 11px;margin:0px; width: 80px; height: 25px; text-align: center;" target="_blank">
                    CANCEL
                </a>
                </p>        
                </div>
                <body>
                </html>`;
    const mail = await sendMail('huylpq@gmail.com', `Xác Nhận Đơn Hàng ${payment.orderNo}`, html)

    await Payment.update({
        status: "PROCESSING"
    },
        {
            where: {
                id: payment.id,
                deletedAt: null
            }
        })

    return {
        status: 200,
        message: "Order processing"
    }
}


exports.approveTransfer = async (orderNo) => {
    const Payment = await db.Payment
    const User = await db.User
    const Order = await db.Order
    const CartItem = await db.CartItem
    const Product = await db.Product

    const payment = await Payment.update({
        status: "COMPLETED"
    },
        {
            where: {
                orderNo: orderNo
            }
        })

    if (payment != 1) {
        throw new Error("Payment error")
    }

    const newPayment = await Payment.findOne({
        where: {
            orderNo: orderNo
        }
    })
    const user = await User.findOne({
        where: {
            userId: newPayment.userId
        }
    })

    const html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Phản Hồi FashionHub</title>
                    <style>
                        body {
                            line-height: 1.6;
                            margin: 20px;
                        }
                        .container {
                            width: 40%; 
                            text-align: justify; 
                            overflow: auto;
                        }
                        .thank-you {
                            font-size: 1.2em;
                            margin-bottom: 20px;
                        }
                        .contact-links {
                            margin-top: 20px;
                        }
                        .contact-links a {
                            display: block;
                            margin-bottom: 10px;
                            text-decoration: none;
                            color: #4285f4;
                            font-weight: bold;
                        }
                
                        @media (max-width: 768px) {
                        .container {
                            width: 90%; 
                        }
                        }
                    </style>
                </head>
                <body>
                    <div class="container" style="color: #121926;">
                        <p class="thank-you">Đơn hàng của bạn đã được xác nhận thành công</p>
                
                        <p>Đơn hàng ${orderNo} của bạn đã được chuẩn bị và sẽ giao trong thời gian sắp tôi. Chúng tôi xin chân thành cảm ơn sự ủng hộ của bạn về dịch vụ của FashionHub. Đó là nguồn động viên lớn để chúng tôi tiếp tục cung cấp trải nghiệm tốt nhất cho khách hàng.</p>
                
                        <p>Nếu bạn có bất kỳ câu hỏi hoặc muốn chia sẻ thêm ý kiến, hãy liên hệ với chúng tôi tại các đường dẫn sau:</p>
                        
                        <div class="contact-links">
                            <a href="mailto:huylpq@gmail.com">- Email: huylpq@gmail.com</a>
                            <a href="tel:0123456789">- Hotline: 0869242144</a>
                        </div>
                
                        <p>Chúng tôi sẽ luôn lắng nghe và sẵn sàng hỗ trợ bạn. Một lần nữa, cảm ơn bạn đã sử dụng dịch vụ của FashionHub</p>
                
                        <p>Trân trọng,<br>Đội ngũ FashionHub</p>
                    </div>
                </body>
                </html>`;

    const mail = await sendMail(`${user.email}`, "Xác Nhận Đơn Hàng Thành Công", html)

    const order = await Order.findOne({
        where: {
            orderNo: orderNo
        }
    })
    const listCartItem = await CartItem.findAll({
        attributes: ['productId', 'quantity'],
        where: {
            cartId: order.cartId
        }
    })
    for (const cartItem of listCartItem) {
        const { productId, quantity } = cartItem

        await Product.decrement('inventory', {
            by: quantity,
            where: { id: productId },
            logging: console.log
        })
    };


    return {
        status: 200,
        message: "Approve success!"
    }
}

exports.cancelTransfer = async (orderNo) => {
    const Payment = await db.Payment
    const User = await db.User

    const payment = await Payment.update({
        status: "CANCEL"
    },
        {
            where: {
                orderNo: orderNo
            }
        }
    )
    if (payment != 1) {
        throw new Error("Payment error")
    }

    const newPayment = await Payment.findOne({
        where: {
            orderNo: orderNo
        }
    })
    const user = await User.findOne({
        where: {
            userId: newPayment.userId
        }
    })

    const html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Phản Hồi FashionHub</title>
                    <style>
                        body {
                            line-height: 1.6;
                            margin: 20px;
                        }
                        .container {
                            width: 40%; 
                            text-align: justify; 
                            overflow: auto;
                        }
                        .thank-you {
                            font-size: 1.2em;
                            margin-bottom: 20px;
                        }
                        .contact-links {
                            margin-top: 20px;
                        }
                        .contact-links a {
                            display: block;
                            margin-bottom: 10px;
                            text-decoration: none;
                            color: #4285f4;
                            font-weight: bold;
                        }
                
                        @media (max-width: 768px) {
                        .container {
                            width: 90%; 
                        }
                        }
                    </style>
                </head>
                <body>
                    <div class="container" style="color: #121926;">
                        <p class="thank-you">Đơn hàng của bạn đã được xác nhận bị hủy</p>
                
                        <p>Đơn hàng ${orderNo} của bạn đã bị hủy do đã không hoàn tất phần thanh toán.</p>
                
                        <p>Nếu bạn có bất kỳ câu hỏi hoặc muốn chia sẻ thêm ý kiến, hãy liên hệ với chúng tôi tại các đường dẫn sau:</p>
                        
                        <div class="contact-links">
                            <a href="mailto:huylpq@gmail.com">- Email: huylpq@gmail.com</a>
                            <a href="tel:0123456789">- Hotline: 0869242144</a>
                        </div>
                
                        <p>Chúng tôi sẽ luôn lắng nghe và sẵn sàng hỗ trợ bạn. Một lần nữa, cảm ơn bạn đã sử dụng dịch vụ của FashionHub</p>
                
                        <p>Trân trọng,<br>Đội ngũ FashionHub</p>
                    </div>
                </body>
                </html>`;

    const mail = await sendMail(`${user.email}`, "Xác Nhận Đơn Hàng Thất Bại", html)

    return {
        status: 200,
        message: "Cancel success!"
    }
}


exports.getAllOrder = async (userId) => {
    const Payment = await db.Payment

    const listPayment = await Payment.findAll({
        attributes: ['id', 'orderNo', 'price', 'discountAmount', 'totalAmount', 'paymentMethod', 'status', 'shippingAddress', 'notes', 'createdAt'],
        where: {
            userId: userId
        },
        order: [['createdAt', 'DESC']]
    });
    return {
        status: 200,
        rows: listPayment
    }

};