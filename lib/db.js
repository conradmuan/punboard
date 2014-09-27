var level = require('levelup');
var redis = require('redisdown');

module.exports = function () {
    return level('punsdb', {
        db: redis,
        url: process.env.REDISTOGO_URL,
        valueEncoding: 'json'
    });
}
