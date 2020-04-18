var express = require('express');
var app = express();
var userRoutes = require('./routes/user.route');
var codersRoutes = require('./routes/coders.route');
var authRoutes = require('./routes/auth.route');
var cookieParser = require('cookie-parser');
var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(cookieParser())

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
});

app.use('/users',  authMiddleware.requireAuth, userRoutes);
app.use('/coders-tokyo', codersRoutes);
app.use('/auth', authRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})
