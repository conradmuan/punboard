var level = require('level-party');

module.exports = function () {
    return level('./punsdb', { valueEncoding: 'json' });
}
