'use strict';
//var config = require('../config');
//var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
  console.log(`Email enviado com sucesso para {to}!`)
  console.log(`Subject: {subject}`)
  console.log(`Body: {body}`)


  //sendgrid.send({
  // to: to,
  //from: "email que vai usar ",
  //subject: subject,
  // html: body
  //})
}
// qdo tiver conta em serviço de email, instalar o sendgrid no terminal npm install sendgrid@2.0.0 --save
// ou colocar sendgrid no file json salvar e apenas npm install
//depois importar no costummer controller e configurar