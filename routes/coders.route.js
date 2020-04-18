var express = require('express')

var router = express.Router()

var codersController = require('../controllers/coders.controller');
router.get('/', codersController.index);

module.exports = router;