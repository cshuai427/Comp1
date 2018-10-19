const nodemailer = require('nodemailer');
const key = require('../config/keys');
const jwt = require('jsonwebtoken');

// Middleware: email confirmation
module.exports = payload => {

    // Create a jwt token to authenticate user email
    jwt.sign({
        id: payload.id
    }, key.secretOrKey, {
        algorithm: "HS256",
        expiresIn: "1d"
    }, (err, emailToken) => {

        // Use route to confirm registered email
        const url = `${key.serverURL}/api/users/email/confirm/${emailToken}`;

        // Set a email account for sending email to user
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: key.emailName,
                pass: key.emailPassword
            }
        });

        // Setup email data with unicode symbols
        let mailOptions = {
            // Server email address
            from: '"BasketBall Buddy"<basketballbuddyaip@gmail.com>',
            // User email address
            to: payload.email,
            // Email subject
            subject: 'Confirm Email',
            // Email context
            html: `<b>Please click this link to confirm your email: <a href="${url}">${emailToken}</a></b>`
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return next(err);
            // Record the amount of confirmation email sent
            console.log('Message sent: %s', info.messageId);
        });
    });
};
