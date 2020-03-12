global.EMAIL_TMPL = 'Olá <strong>{0}</strong> Seja bem vindo ao Node Store. <br> Criado em: ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
global.SALT_KEY = '65auyg45-09oiuy90u-yu8ut-afg5te32';

module.exports = {
    connectionString : 'mongodb+srv://root:1234@cluster0-e7nnh.azure.mongodb.net/nodestr?',
    sendGridKey :'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',
    contanerConnectionKey : 'TBD' 
}