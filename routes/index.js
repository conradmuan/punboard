var levelup = require('level-party');
var _ = require('underscore');
var db = require('../lib/db')();
var express = require('express');
var router = express.Router();

var weights = {
    'groan': 1,
    'trombone': .5
};

function clownScore (stats, averager) {
    var groanScore = stats.groan * weights.groan;
    var tromboneScore = stats.trombone * weights.trombone;

    if (tromboneScore > groanScore) return 1;

    var score = ((groanScore - tromboneScore) / stats.puns) / averager;

    return Math.ceil(score * 100);
}

function createLeaderBoard(callback) {
  var leaderboardLookup = {};

  db.createReadStream()
      .on('data', function(data) {
          var pun = data.value;
          var author_id = pun.tweet.user.id_str;
          var person;
          if (typeof leaderboardLookup[author_id] == 'undefined') {
              leaderboardLookup[author_id] = {
                  author: pun.tweet.user,
                  stats: {
                      puns: 0,
                      groan: 0,
                      trombone: 0
                  },
                  puns: []
              };
          }
          person = leaderboardLookup[author_id];
          person.stats.puns += 1;
          person.stats.groan += pun.stats.groan;
          person.stats.trombone += pun.stats.trombone;
          person.puns.push(pun);
      })
      .on('end', function() {
          var leaderboardArray = _.values(leaderboardLookup);
          callback(null, leaderboardArray);
      });
}

/* GET home page. */
router.get('/', function(req, res) {
  createLeaderBoard(function(err, leaderboard){

    leaderboard = leaderboard.map(function (person) {
        person.stats.clown = clownScore(person.stats, leaderboard.length);
        return person;
    });

    leaderboard = _.sortBy(leaderboard, function (person) {
        return person.stats.clown;
    }).reverse();

    res.render('index', {
        title: 'Express',
        leaderboard: leaderboard
    });
  });
});

module.exports = router;
