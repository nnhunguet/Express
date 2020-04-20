var db = require('../db');
module.exports.addToCart = function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db.get('sessions').find({ id: sessionId}).get('cart.'+productId, 0).value();

    db.get('sessions')
    .find({ id: sessionId }) 
    .set('cart.' + productId, count+1)
    .write();
    
    var data = db.get('sessions').find({ id: sessionId }).value();
    if(data.cart) {
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionId;

        var sumCount = Object.values(data.cart).reduce(function(acc,cur){
            return acc + cur;
        },0);
        console.log(sumCount);
        res.locals.sumCount = sumCount;
    }

    res.redirect('/products');
};