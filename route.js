const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.route('/').get(controller.getIp);

router.route('/api/hello').get(controller.getData);

module.exports = router;
