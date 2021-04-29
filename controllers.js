const path = require('path');

const User = require('./models/user');
const Exercise = require('./models/exercise');


async function getHome(req, res) {
    const homePath = path.join(__dirname + '/views/index.html');
    try {
        res.status(200).sendFile(homePath, (err) => {
            if (err) throw new Error('Page not found');
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function postUser(req, res) {
    const {
        username
    } = req.body;
    try {
        const newUser = new User({
            username: username
        });
        await newUser.save((err, doc) => {
            if (err) {
                if(err.code && err.code == 11000) {
                    res.status(200).json({error: 'Username already taken!'})
                    return;
                }
            }
            const result = {
                ...doc._doc,
                saved: true
            }
            res.status(200).json(result);
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function postExercise(req, res) {
    let {
        userId,
        description,
        duration,
        date
    } = req.body;
    if (!date || date === '' || date === undefined) {
        date = new Date;
    } else if (date) {
        date = new Date(date);
    }
    try {
        await User.findById(userId, (err, doc) => {
            if (err) {
                res.status(200).json({error: 'User not found!'})
            }
            const newExercise = new Exercise({
                userId: userId,
                description: description,
                duration: duration,
                date: date
            })
            newExercise.save((err, ex) => {
                if (err) {
                    res.status(200).json({error: err.message})
                }
                const result = {
                    ...ex._doc,
                    saved: true
                }
                res.status(200).json(result);
            })
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function getUser(req, res) {
    let { from, to, limit } = req.query;
    let { id } = req.params;

    from = from ? new Date(from) : new Date("1970-01-01");
    to = to ? new Date(to) : new Date();
    console.log({from, to});

    try {
        await User.findById(id)
        .then(user => {
            if (!user) {
                res.status(200).json({error: 'User not found!'})
                return;
            }
            Exercise.find({ userId: id })
                .where('date').gte(from).lte(to)
                .limit(+limit).exec()
                .then(log => {
                    res.status(200).json({
                        _id: user._id,
                        username: user.username,
                        count: log.length,
                        log: log.map(l => ({
                            description: l.description,
                            duration: l.duration,
                            date: l.date
                        }))
                    })
                })
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getHome,
    postUser,
    getUsers,
    postExercise,
    getUser
};