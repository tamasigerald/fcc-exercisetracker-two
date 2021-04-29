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
                }
            }
            const result = {
                ...newUser._doc,
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
    // if (!date || date === '' || date === undefined) {
    //     date = new Date().toDateString();
    // } else if (date) {
    //     date = new Date(date).toDateString();

    // }
    try {
        res.status(200).json({
            user: userId,
            dur: duration,
            des: description,
            date: date,
        });
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
    postExercise
};