/*const functions = require('firebase-functions');
const database = require('firebase-database');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


exports.auth = functions.https.onRequest((request, response) => {
    const { document, password } = request.body;

    // verificar se o cpf existe - se não existir retornar 404 - usuário inexistente

    // verficiar se a senha é a mesma que está no banco - se não for a mesma retornar 401 / usuário ou senha inválidos

    // retornar status 200 - OK
    response.status(200).send({
        message: 'usuario autenticado com sucesso',
        token: '982urq08934hpu9qhfhu'
    });
   });
   */

//********************tentativa do site : https://medium.com/@adsonrocha/como-enviar-e-mails-usando-cloud-functions-do-firebase-com-o-nodemailer-5c8bf6d9f8e8 ************/

'use strict';
const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'organizagalpao@gmail.com',
        pass: 'Organiza1234'
    }
});

  
exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const corpo = req.query.corpo;
        const remMail = req.query.remMail;
        const nome = req.query.nome;
        let remetente = '"Organiza Galpão" <organizagalpao@gmail.com>';
        let assunto = "Contato OrganizaGalpão";
        let destinatarios = '"Organiza Galpão" <organizagalpao@gmail.com>'; // lista de e-mails destinatarios separados por ,
        let texto = corpo;
        let corpoHtml = `<p style = "font-size: 18px;">Nome: </p>` + nome + 
                        `<br/>--------------------------------------------------------------------
                        <p style = "font-size: 18px;">E-mail: </p>` + remMail + 
                        `<br/>--------------------------------------------------------------------
                        <p style="font-size: 18px;">Mensagem: </p>`+ corpo;

        let email = {
            from: remetente,
            to: destinatarios,
            subject: assunto,
            text: texto,
            html: corpoHtml
        };
    
        return transporter.sendMail(email, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
