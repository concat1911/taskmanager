const nodemailer = require('nodemailer');
const {gmailAcc} = require('../secrets')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailAcc.name,
        pass: gmailAcc.password
    }
});

async function sendWelcome(email, name) {
    let info = await transporter.sendMail({
        from: gmailAcc.name, 
        to: email, // list of receivers
        subject: 'Hello ' + name + ' thanks for joining!',
        text: `Welcome to the app!`,
        // html: '<b>Hello world?</b>' // html body
    });
    return info;
}

async function sendGoodbye(email, name) {
    let info = await transporter.sendMail({
        from: gmailAcc.name, 
        to: email, // list of receivers
        subject: 'Goodbye ' + name,
        text: `please send us some feedback.`,
        // html: '<b>Hello world?</b>' // html body
    });
    return info
}

async function sendCustom(mailObj) {
    try {
        transporter.sendMail(mailObj)
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    sendWelcome,
    sendGoodbye,
    sendCustom
}
