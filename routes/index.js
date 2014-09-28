var levelup = require('level-party');
var _ = require('underscore');
var db = require('../lib/db')();
var express = require('express');
var router = express.Router();

var weights = {
    'groan': 1,
    'trombone': .5
};

function baseClownScore (stats) {
    var groanScore = stats.groan * weights.groan;
    var tromboneScore = stats.trombone * weights.trombone;

    return (groanScore + tromboneScore);
}

function mapClownScores (leaderboard) {
    leaderboard = leaderboard.map(function (person) {
        // if (person.author.screen_name === 'conradmuan') {
        //     person.stats.groan = 100;
        // }
        person.stats.clown = baseClownScore(person.stats);
        return person;
    });

    var numerator = leaderboard.reduce(function (memo, person) {
        return (memo + person.stats.clown);
    }, 0);

    var denominator = leaderboard.reduce(function (memo, person) {
        return (memo + person.stats.puns);
    }, 0);

    leaderboard = leaderboard.map(function (person) {
        var voteScore = (person.stats.clown / numerator);
        var punScore = (person.stats.puns / denominator);
        var total = (voteScore + punScore);
        var clown = Math.floor(total * 100);

        person.stats.clown = clown;
        return person;
    });

    var drk = _.filter(leaderboard, function (person) {
        return (person.author.screen_name === 'drk');
    });

    var notDrk = _.filter(leaderboard, function (person) {
        return (person.author.screen_name !== 'drk');
    });

    leaderboard = _.sortBy(notDrk, function (person) {
        return person.stats.clown;
    });

    leaderboard.push(drk[0]);

    return leaderboard.reverse();
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

    leaderboard = mapClownScores(leaderboard);

    res.render('index', {
        title: 'Express',
        leaderboard: leaderboard
    });
  });
});

module.exports = router;
