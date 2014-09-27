var levelup = require('level-party');
var _ = require('underscore');
var db = require('../lib/db')();
var express = require('express');
var router = express.Router();

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
    console.dir(leaderboard);
    res.render('index', {
        title: 'Express',
        leaderboard: leaderboard
    });
  });
});

module.exports = router;
