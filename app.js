/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var twitter = require('ntwitter'),
    geocoder = require('geocoder');

var twit = new twitter({
    consumer_key: 'iH7lD3ol6JSQPKPHzLCsQ',
    consumer_secret: 'hp812LNbiIYvAyFfpJJGLE39eUaYeoZF9d786bnzTYo',
    access_token_key: '5766762-Xs7sJJHk8m9WpadY6GrRiW6oBhaDu4jDUH2S6xsqTc',
    access_token_secret: 'i2oTWSzZC10lXHOSIqHRbelJTFnLGPN8RUjAtknIo'
});

var users = [132235973, 487198119]

console.log("Starting stream...");
twit.stream('statuses/filter', {'follow': users.toString()}, function (stream) {
    stream.on('data', function (data) {
        console.log(data);

        // make sure this is the original, from the source
        if (users.indexOf(data.user.id) > -1) {
            console.log(data.text);
            geocoder.geocode(data.text, function (err, d) {
                console.log(d);
            });
        } else {
            console.log("REJECTED");
        }
    });
});

/*
 { created_at: 'Tue Apr 09 20:43:50 +0000 2013',
 id: 321725161038557200,
 id_str: '321725161038557184',
 text: 'RT @NYScanner: Bronx: 2 Castle Hill Ave Behind YMCA FDNY reporting a DOA floater that washed up on shore. NYPD ESU &amp; Harbor responding.',
 source: '<a href="http://www.echofon.com/" rel="nofollow">Echofon</a>',
 truncated: false,
 in_reply_to_status_id: null,
 in_reply_to_status_id_str: null,
 in_reply_to_user_id: null,
 in_reply_to_user_id_str: null,
 in_reply_to_screen_name: null,
 user:
 { id: 716202589,
 id_str: '716202589',
 name: 'BillionsBurgh™',
 screen_name: 'Billionsburg_F',
 location: 'Billionsburgh, Brooklyn NYC',
 url: 'http://xnxx.com',
 description: 'Yeah I Walk That Walk, Yeah I Talk That Talk Im From Grimey Ass NEW YAWK!   \n\nINSTAGRAM  BILLIONSBURGH_F',
 protected: false,
 followers_count: 234,
 friends_count: 282,
 listed_count: 1,
 created_at: 'Wed Jul 25 14:56:36 +0000 2012',
 favourites_count: 55,
 utc_offset: null,
 time_zone: null,
 geo_enabled: false,
 verified: false,
 statuses_count: 10488,
 lang: 'en',
 contributors_enabled: false,
 is_translator: false,
 profile_background_color: 'C0DEED',
 profile_background_image_url: 'http://a0.twimg.com/images/themes/theme1/bg.png',
 profile_background_image_url_https: 'https://si0.twimg.com/images/themes/theme1/bg.png',
 profile_background_tile: false,
 profile_image_url: 'http://a0.twimg.com/profile_images/3429251963/a0da6b781fe3af0a776cf1b17c7ddd3f_normal.jpeg',
 profile_image_url_https: 'https://si0.twimg.com/profile_images/3429251963/a0da6b781fe3af0a776cf1b17c7ddd3f_normal.jpeg',
 profile_link_color: '0084B4',
 profile_sidebar_border_color: 'C0DEED',
 profile_sidebar_fill_color: 'DDEEF6',
 profile_text_color: '333333',
 profile_use_background_image: true,
 default_profile: true,
 default_profile_image: false,
 following: null,
 follow_request_sent: null,
 notifications: null },
 geo: null,
 coordinates: null,
 place: null,
 contributors: null,
 retweeted_status:
 { created_at: 'Tue Apr 09 20:12:12 +0000 2013',
 id: 321717200832577540,
 id_str: '321717200832577538',
 text: 'Bronx: 2 Castle Hill Ave Behind YMCA FDNY reporting a DOA floater that washed up on shore. NYPD ESU &amp; Harbor responding.',
 source: 'web',
 truncated: false,
 in_reply_to_status_id: null,
 in_reply_to_status_id_str: null,
 in_reply_to_user_id: null,
 in_reply_to_user_id_str: null,
 in_reply_to_screen_name: null,
 user:
 { id: 132235973,
 id_str: '132235973',
 name: 'NY Scanner',
 screen_name: 'NYScanner',
 location: ' NYC',
 url: null,
 description: 'Just keeping you posted that NYC Never sleeps always in for action☺ See Something Say Something☎ ',
 protected: false,
 followers_count: 38734,
 friends_count: 0,
 listed_count: 875,
 created_at: 'Mon Apr 12 17:31:32 +0000 2010',
 favourites_count: 0,
 utc_offset: -18000,
 time_zone: 'Quito',
 geo_enabled: false,
 verified: false,
 statuses_count: 4207,
 lang: 'en',
 contributors_enabled: false,
 is_translator: false,
 profile_background_color: 'C0DEED',
 profile_background_image_url: 'http://a0.twimg.com/profile_background_images/406942375/image__1_.jpg',
 profile_background_image_url_https: 'https://si0.twimg.com/profile_background_images/406942375/image__1_.jpg',
 profile_background_tile: true,
 profile_image_url: 'http://a0.twimg.com/profile_images/1590612086/article-1387257-0C1623C500000578-545_634x464_normal.jpg',
 profile_image_url_https: 'https://si0.twimg.com/profile_images/1590612086/article-1387257-0C1623C500000578-545_634x464_normal.jpg',
 profile_link_color: '0084B4',
 profile_sidebar_border_color: 'C0DEED',
 profile_sidebar_fill_color: 'DDEEF6',
 profile_text_color: '333333',
 profile_use_background_image: true,
 default_profile: false,
 default_profile_image: false,
 following: null,
 follow_request_sent: null,
 notifications: null },
 geo: null,
 coordinates: null,
 place: null,
 contributors: null,
 retweet_count: 18,
 favorite_count: 0,
 entities: { hashtags: [], urls: [], user_mentions: [] },
 favorited: false,
 retweeted: false,
 lang: 'en' },
 retweet_count: 0,
 favorite_count: 0,
 entities: { hashtags: [], urls: [], user_mentions: [ [Object] ] },
 favorited: false,
 retweeted: false,
 filter_level: 'low' }
 */
