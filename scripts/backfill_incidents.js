var models = require('../models'),
    twitter = require('twitter'),
    tweetParser = require('../lib/tweetParser');

var twit = new twitter({
    consumer_key: 'iH7lD3ol6JSQPKPHzLCsQ',
    consumer_secret: 'hp812LNbiIYvAyFfpJJGLE39eUaYeoZF9d786bnzTYo',
    access_token_key: '5766762-Xs7sJJHk8m9WpadY6GrRiW6oBhaDu4jDUH2S6xsqTc',
    access_token_secret: 'i2oTWSzZC10lXHOSIqHRbelJTFnLGPN8RUjAtknIo'
});

// Users we are going to follow
var users = [132235973, 487198119]

twit.showUser(132235973, function (user) {

    console.log(user);

    tweetParser.parseGeoFromTweet(user.status.text, function (e, d) {
        console.log(d);

        var i = new models.incident();
        i.description = user.status.text;
        i.source = user.name;
        i.formattedAddress = d.results[0].formatted_address;
        i.geoLat = d.results[0].geometry.location.lat;
        i.geoLng = d.results[0].geometry.location.lng;
        i.save();
        console.log(i);
        console.log("Saved a new incident");
    });
});