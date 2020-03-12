'use strict'

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendGridKey);

exports.send = async (to, subject, message) => {

    await sendgrid.send({
        from: 'bfyamada@outlook.com',
        to: to,
        subject: subject,
        html: message
    });
}
 


