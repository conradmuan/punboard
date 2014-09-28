var express = require('express');
var bodyparser = require('body-parser');
var router = express.Router();
var https = require('https');

var options = {
  hostname: 'api.twitter.com',
  port: 443,
  method: 'GET'
};

router.post('/', bodyparser.json(), function(req, res){
  if(!req.body) return res.sendStatus(400);
  
  var id = req.body.id;
  
  options.path = '/1/statuses/oembed.json?id='+id+'&align=center';
  
  var tweet = https.request(options, function(response){
    response.on('data', function(data){
      return res.send(data);
    });
  });

  tweet.end();
});

module.exports = router;