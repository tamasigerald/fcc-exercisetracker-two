const express = require('express');
const router = express.Router();

const controller = require('./controllers');

router.route('/')
.get(controller.getHome);

router.route('/api/users')
.post(controller.postUser)
.get(controller.getUsers);

router.route('/api/users/:id/exercises')
.post(controller.postExercise);

router.route('/api/users/:id/logs')
.get(controller.getUser);

module.exports = router;