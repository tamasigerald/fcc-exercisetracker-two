const path = require('path');


async function getHome(req, res) {
    const homePath = path.join(__dirname + '/views/index.html');
    try {
        res.status(200).sendFile(homePath, (err) => {
            if (err) throw new Error('Page not found');
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


module.exports = { getHome };