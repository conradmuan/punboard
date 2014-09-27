var async = require('async');
var db = require('../lib/db')();

var ids = ['515743592187326460', '515743592187326463', '515743592187326462', '515743592187326466', '515743592187326468'];

var count = 0;
async.each(ids, function(id, cb) {
    db.put(id, {
        tweet: {
            created_at: 'Sat Sep 27 06:03:49 +0000 2014',
            id: id,
            id_str: id,
            text: 'Hey there again #comedydayhacktest',
            source: '<a href="http://itunes.apple.com/us/app/twitter/id409789998?mt=12" rel="nofollow">Twitter for Mac</a>',
            truncated: false,
            in_reply_to_status_id: null,
            in_reply_to_status_id_str: null,
            in_reply_to_user_id: null,
            in_reply_to_user_id_str: null,
            in_reply_to_screen_name: null,
            user: {
                id: 14800329,
                id_str: '14800329' + count,
                name: 'Derek Reynolds',
                screen_name: 'drk',
                location: 'San Francisco, CA',
                description: 'If peeing your pants is cool, then consider me Miles Davis. I work at http://t.co/R6iaoclwx0.',
                url: 'http://t.co/JiPkqC6qxp',
                entities: [Object],
                protected: false,
                followers_count: 494,
                friends_count: 641,
                listed_count: 28,
                created_at: 'Fri May 16 15:54:29 +0000 2008',
                favourites_count: 1381,
                utc_offset: 12600,
                time_zone: 'Tehran',
                geo_enabled: true,
                verified: false,
                statuses_count: 6669,
                lang: 'en',
                contributors_enabled: false,
                is_translator: false,
                is_translation_enabled: false,
                profile_background_color: '5C5C5C',
                profile_background_image_url: 'http://pbs.twimg.com/profile_background_images/32636611/IMG_0357.JPG',
                profile_background_image_url_https: 'https://pbs.twimg.com/profile_background_images/32636611/IMG_0357.JPG',
                profile_background_tile: false,
                profile_image_url: 'http://pbs.twimg.com/profile_images/484753257684688896/b7MvafFs_normal.png',
                profile_image_url_https: 'https://pbs.twimg.com/profile_images/484753257684688896/b7MvafFs_normal.png',
                profile_link_color: '0084B4',
                profile_sidebar_border_color: '000000',
                profile_sidebar_fill_color: '292929',
                profile_text_color: '8C8C8C',
                profile_use_background_image: false,
                default_profile: false,
                default_profile_image: false,
                following: false,
                follow_request_sent: false,
                notifications: false
            },
            geo: null,
            coordinates: null,
            place: null,
            contributors: null,
            retweet_count: 0,
            favorite_count: 0,
            entities: {
                hashtags: [Object],
                symbols: [],
                urls: [],
                user_mentions: []
            },
            favorited: false,
            retweeted: false,
            lang: 'en'
        },
        stats: {
            groan: 0,
            trombone: 0
        },
        votes: []
    }, cb)
  count++;
}, function(err) {
  if(err) console.log(err);
});