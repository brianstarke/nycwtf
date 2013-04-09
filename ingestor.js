var twitter = require('ntwitter'),
    geocoder = require('geocoder');

var twit = new twitter({
    consumer_key: 'iH7lD3ol6JSQPKPHzLCsQ',
    consumer_secret: 'hp812LNbiIYvAyFfpJJGLE39eUaYeoZF9d786bnzTYo',
    access_token_key: '5766762-Xs7sJJHk8m9WpadY6GrRiW6oBhaDu4jDUH2S6xsqTc',
    access_token_secret: 'i2oTWSzZC10lXHOSIqHRbelJTFnLGPN8RUjAtknIo'
});

var users = [132235973, 487198119]

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

