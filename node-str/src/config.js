global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>Olá.{0}<strong>seja bem vindo à API Store!';

module.exports = {
    connectionString: "mongodb+srv://pepita:2014@cluster0.gteiq.mongodb.net/blogposts?retryWrites=true&w=majority",
    sendgridKey: 'TBD',// entre aspas colocar link do serviço de email que contratar
    containerConnectionString: 'TBD' // aqui colocar o link do azure -connectionstring
}
