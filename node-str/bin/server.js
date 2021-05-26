'use strict'
// importar modulos NOTE que ele mudou em debug nodestr por balta: server
const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');
//const MongoInMemory = require('mongo-in-memory'); // tem

//const mongoPort = 8000; //n tem
//const mongoServerInstance = new MongoInMemory(mongoPort);// n tem
//const databaseName = 'Blog'// n tem

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// criar servidor
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta: ' + port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    //mongoServerInstance.start((error, config) => {
    // if (error) {
    // console.error(error);
    //} else {
    // console.log('mongodb rodando em memoria:')
    // console.log(`host ${config.host}`);
    // console.log(`port ${config.port}`);

    //const mongoUri = mongoServerInstance.getMongouri(databaseName);
    //}
    //});//parte acima não tem, esta função começa abaixo com const addr

    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
