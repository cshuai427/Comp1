const nodemailer = require('nodemailer');
const key = require('../config/keys');
const jwt = require('jsonwebtoken');
module.exports = payload => {

    jwt.sign({
        id: payload.id
    }, key.secretOrKey, {
        algorithm: "HS256",
        expiresIn: "1d"
    }, (err, emailToken) => {
        const url = `http://localhost:5000/api/users/email/confirm/${emailToken}`;

        // Use Gmail account
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: key.emailName,
                pass: key.emailPassword
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"BasketBall Buddy"<basketballbuddyaip@gmail.com>',    // sender address
            to: payload.email,                                  // email receivers
            subject: 'Confirm Email',                           // Subject line
            html: `<b>Please click this link to confirm your email: <a href="${url}">${emailToken}</a></b>`  // html body

        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return next(err);
            console.log('Message sent: %s', info.messageId);
        });
    });
};