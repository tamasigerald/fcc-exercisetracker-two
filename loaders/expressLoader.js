
const router = require('../routes');


function expressLoader(app, express) {
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static('public'));

    app.use(router);


    app.use(function(req, res) {
        res.status(404).json({error: 'Page not found!'});
    })

    app.use(function(err, req, res) {
        console.error(err);
        res.status(500).json({error: err.message});
    });

}

module.exports = expressLoader;