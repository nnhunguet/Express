var express = require('express')

var router = express.Router()
var validate = require('../validate/user.validate');
var controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.getCreate); 

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.getId);

module.exports = router;