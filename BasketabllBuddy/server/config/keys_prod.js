
module.exports = {

    //database link
    mongoURI: process.env.MONGO_URI,
    secretOrKey: process.env.SECRET_OR_KEY,

    // nodemailer
    emailName: process.env.MAIL_SERVER,
    emailPassword: process.env.MAIL_PASS

};