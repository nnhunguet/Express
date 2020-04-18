var express = require('express');
var app = express();
var userRoutes = require('./routes/user.route');
var codersRoutes = require('./routes/coders.route');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
});

app.use('/users', userRoutes);
app.use('/coders-tokyo', codersRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})
