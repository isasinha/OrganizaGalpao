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