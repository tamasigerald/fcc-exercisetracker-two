const express = require('express');
const router = express.Router();

const controller = require('./controllers');

router.route('/')
.get(controller.getHome);

module.exports = router;