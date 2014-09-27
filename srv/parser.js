var twit = require('../lib/twitter')();
var async = require('async');
var _ = require('underscore');
var punsDb = require('../lib/db')();

var GROAN = 'groan';
var TROMBONE = 'trombone';

var voteTags = [GROAN, TROMBONE];

/**
 * Fetch tweet from twitter for given tweet id.
 */
function fetchPunTweet (id, callback) {
    twit.get(
        '/statuses/show/' + id + '.json',
        { include_entities:true },
        function (data) {
            return callback(null, data);
        }
    );
}

/**
 * Put a pun in the database.
 *
 * @param {String} tweet id
 * @param {Object} original tweet (the pun!)
 */
function createPun (id, pun, callback) {
    punsDb.put(id, {
        tweet: pun,
        stats: {
            groan: 0,
            trombone: 0
        },
        votes: []
    }, callback);
}

/**
 * Lazy load a pun from the database.
 */
function fetchOrCreatePun (punId, callback) {
    punsDb.get(punId, function (err, pun) {
        if (typeof pun !== 'undefined') return callback(null, pun);

        fetchPunTweet(punId, function (err, pun) {
            createPun(punId, pun, function (err) {
                if (!err) return punsDb.get(punId, callback);
            });
        });
    });
}

function reduceHashtagScores (hashtags) {
    var initial = {};

    return hashtags.reduce(function (memo, tag) {
        if (tag.text === 'groan') memo['groan'] = 1;
        if (tag.text === 'sadtrombone') memo['trombone'] = 1;
        return memo;
    }, initial);
}

function calcHashtags (stats, hashtags) {
    var scores = reduceHashtagScores(hashtags);

    if (scores.groan > 0) stats.groan += scores.groan;
    if (scores.trombone > 0) stats.trombone += scores.trombone;

    return stats;
}

function hasVote (hashtags) {
    return _.some(hashtags, function (tag) {
        return (voteTags.indexOf(tag.text) >= 0);
    });
}

/**
 * Handles creating and incrementing pun stats.
 */
function parseTweet (tweet, callback) {
    var punId = tweet.in_reply_to_status_id_str;

    if (punId === null) return callback('Not a reply');

    async.auto({
        fetch: function (callback) {
            fetchOrCreatePun(punId, callback);
        },

        calculate: ['fetch', function (callback, obj) {
            var pun = obj.fetch;
            var tags = tweet.entities.hashtags;

            if (!hasVote(tags)) return callback('No votes');

            pun.stats = calcHashtags(pun.stats, tags);
            pun.votes.push(tweet);

            console.dir(pun);

            punsDb.put(pun.tweet.id_str, pun, callback);
        }]
    }, callback);
}

// array of words you want to track
var words = ["#comedyhackdaytest"];
console.log('tracking: ', words.join(', '));
twit.stream('statuses/filter', { track: words.join(',') }, function(stream) {
    stream.on('data', function(data) {
        console.log(data);
        console.log('IN: ', data);
        // parseTweet(data);
    });
});

// Easier testing
// twit.search(words.join(','), function(data) {
//     // console.log('IN: ', data.statuses[0]);
//     parseTweet(data.statuses[0], function (err, results) {
//         if (err) console.error(err);
//         console.log('Parsed Tweet');
//     });
// });
