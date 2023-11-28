const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
        clientId: '588614105091-6ckooh2263cjor28tcslulp4eb03ejof.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04Bfe5n3CEIwnCgYIARAAGAQSNgF-L9IrJGfkVpYaQJeYnzI41g7g3FTstCiVtdg7js_vMzleIgV9yM98hQchtXzE1qzOgJY3UQ'
    }
})

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'arytesting422@gmail.com',
        to,
        subject,
        text
    } 
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(error)
        }else{
            console.log('Email sent: ' + info.response)
        }
    })
}

const sendMailHTML = (to, subject, html) => {
    const mailOptions = {
        from: 'arytesting422@gmail.com',
        to,
        subject,
        html
    } 
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(error)
        }else{
            console.log('Email sent: ' + info.response)
        }
    })
}

module.exports = {
    sendMail,
    sendMailHTML
};