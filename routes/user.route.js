var express = require('express');
var multer = require('multer');

var router = express.Router()
var validate = require('../validate/user.validate');
var controller = require('../controllers/user.controller');

var upload = multer({dest: './public/uploads/'})

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.getCreate); 

router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate);

router.get('/:id', controller.getId);

module.exports = router;