module.exports = {
    mongoURI: process.env.MONGO_URI,
    //database link

    secretOrKey: process.env.SECRET_OR_KEY,


    // nodemailer
    emailName: process.env.MAIL_SERVER,
    emailPassword: process.env.MAIL_KEY
};