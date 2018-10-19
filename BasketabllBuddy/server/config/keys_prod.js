
module.exports = {

    // Database link
    mongoURI: process.env.MONGO_URI,

    // Hash Secret
    secretOrKey: process.env.SECRET_OR_KEY,

    // Nodemailer needed email
    emailName: process.env.MAIL_SERVER,
    emailPassword: process.env.MAIL_PASS,

    // Host url
    serverURL: process.env.SERVERURL,
    clientURL: process.env.CLIENTURL

};