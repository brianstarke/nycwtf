var model = require('../models'),
    twitter = require('twitter'),
    tweetParser = require('./tweetParser');

var twit = new twitter({
    consumer_key: 'iH7lD3ol6JSQPKPHzLCsQ',
    consumer_secret: 'hp812LNbiIYvAyFfpJJGLE39eUaYeoZF9d786bnzTYo',
    access_token_key: '5766762-Xs7sJJHk8m9WpadY6GrRiW6oBhaDu4jDUH2S6xsqTc',
    access_token_secret: 'i2oTWSzZC10lXHOSIqHRbelJTFnLGPN8RUjAtknIo'
});

// Users we are going to follow
var users = [132235973, 487198119]

module.exports.start = function () {
    console.log("Starting stream...");
    twit.stream('statuses/filter', {'follow': users.toString()}, function (stream) {
        stream.on('data', function (err, data) {
            console.log(err);
            // make sure this is the original, from one of our sources
            if (users.indexOf(data.user.id) > -1) {
                try {
                    tweetParser.parseGeoFromTweet(data.text, function (e, d) {
                        var incident = new model.incident();
                        incident.description = data.text;
                        incident.source = data.user.name;
                        incident.formattedAddress = d.results[0].formatted_address;
                        incident.geoLat = d.results[0].geometry.location.lat;
                        incident.geoLng = d.results[0].geometry.location.lng;
                        incident.save();
                        console.log("Saved a new incident");
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("Rejected an incident");
            }
        });
    });
}