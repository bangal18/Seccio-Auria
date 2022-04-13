const nodemailer = require('nodemailer');

function sendMail(code,mail) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bangalcamara2002@gmail.com',
            pass: 'OeIgeagnb'
        }
    });
    var mensaje = `Code: ${code}`;
    var mailOptions = {
        from: 'bangalcamara2002@gmail.com',
        to: mail,
        subject: 'Asunto Del Correo',
        text: mensaje
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

exports.sendMail = sendMail;