require('dotenv').config();

var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var csurf = require('csurf');

var userRoutes = require('./routes/user.route');
var codersRoutes = require('./routes/coders.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route'); 
var transferRoutes = require('./routes/transfer.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({ cookie: true }));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
});

app.use('/users',  authMiddleware.requireAuth, userRoutes);
app.use('/coders-tokyo', codersRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddleware.requireAuth, transferRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})
