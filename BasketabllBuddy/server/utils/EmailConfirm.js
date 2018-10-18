const nodemailer = require('nodemailer');
const key = require('../config/keys');
const jwt = require('jsonwebtoken');

//middleware: email confirmation 
module.exports = payload => {
    // create a jwt token to authenticate user email
    jwt.sign({
        id: payload.id
    }, key.secretOrKey, {
        algorithm: "HS256",
        expiresIn: "1d"
    }, (err, emailToken) => {
        //use route to confirm registered email
        const url = `https://basketballbuddaip.herokuapp.com/api/users/email/confirm/${emailToken}`;

        //set a gmail account for sending email to user
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: key.emailName,
                pass: key.emailPassword
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            // server email address
            from: '"BasketBall Buddy"<basketballbuddyaip@gmail.com>',
            // user email address
            to: payload.email,
            // email subject
            subject: 'Confirm Email',
            // email context
            html: `<b>Please click this link to confirm your email: <a href="${url}">${emailToken}</a></b>`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return next(err);
            // record the amount of confirmation email sent
            console.log('Message sent: %s', info.messageId);
        });
    });
};
