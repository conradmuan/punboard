var level = require('levelup');
var redis = require('redisdown');

module.exports = function () {
    return level('punsdb', {
        db: redis,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        valueEncoding: 'json'
    });
}
