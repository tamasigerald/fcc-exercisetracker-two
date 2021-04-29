const express = require('express');
const cors = require('cors');

const config = require('./config');
const loader = require('./loader');


function serverBootstrapping() {
    const app = express();
    const server = app.listen(config.server.port);

    app.use(cors());

    server.on('error', onErrorHandler);
    server.on('listening', function() {
        console.info(`Server is listening on port: ${config.server.port}`);
        loader(app, express);
    });

    function onErrorHandler(err) {
        switch(err.code) {
            case 'EACCES':
                console.error('Requires elevated privileges');
                break;
            case 'EADDRINUSE':
                console.error(config.server.port + ' is already in use');
                break;
            default:
                console.error(err);
        }
    
    }
}

serverBootstrapping();