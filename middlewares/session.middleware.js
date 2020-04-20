var shortid = require('shortid');
var db = require('../db');
module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({
            id:sessionId
        }).write();
    }

    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    var data = db.get('sessions').find({ id: sessionId }).value();
    var sumCount;
    if(data) {
        if(data.cart) {
            var productId = req.params.productId;
            var sessionId = req.signedCookies.sessionId;

            sumCount = Object.values(data.cart).reduce(function(acc,cur){
                return acc + cur;
            },0);
            console.log(sumCount);
        }
    }
    res.locals.sumCount = sumCount;
    next()
}