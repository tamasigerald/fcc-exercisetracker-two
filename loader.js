const mongooseLoader = require('./loaders/mongooseLoader');
const expressLoader = require('./loaders/expressLoader');

async function loader(app, express) {
    await mongooseLoader();
    console.info('Mongoose ready!');
    expressLoader(app, express);
    console.info('Express ready!');
}

module.exports = loader;