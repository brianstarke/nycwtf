var assert = require("assert")
tweetParser = require("../lib/tweetParser");

var testText1 = "Staten Island: Box #1758 Brielle Ave &amp; Walcott Ave. All hands working for a deep seated brush fire in the Farm Colony. Fire is DWH. NY02";
var testText2 = "Queens: 247-14 South Conduit Ave NYPD units in foot pursuit after a perp wanted for armed robbery. ESU Aviation and K-9 units requested. NY02";
var testText3 = "Bronx: 2 Castle Hill Ave Behind YMCA FDNY reporting a DOA floater that washed up on shore. NYPD ESU & Harbor responding.";
var testText4 = "Staten Island: Verrazano-Narrows Bridge Lower level. FDNY on scene of a fully involved car fire. Expect heavy delays in the area.";

describe('TweetParser', function () {
    describe('#parseCountyFromText', function () {
        it('should correctly parse out the county', function () {
            assert.equal('Staten Island', tweetParser.parseCountyFromText(testText1));
            assert.equal('Queens', tweetParser.parseCountyFromText(testText2));
            assert.equal('Bronx', tweetParser.parseCountyFromText(testText3));
        })
    });

    describe('#cleanupText', function () {
        it('should remove &amp; and Boxes', function () {
            assert.equal(
                "Staten Island: Brielle Ave and Walcott Ave. All hands working for a deep seated brush fire in the Farm Colony. Fire is DWH. NY02",
                tweetParser.cleanupText(testText1));
        });
    });

    describe('#parseAddressFromText', function () {
        it('should pull out a geocodeable street address of some sort', function () {
            assert.equal('Brielle Ave and Walcott Ave, Staten Island, NY', tweetParser.parseTextForAddress(testText1));
            assert.equal('247-14 South Conduit Ave, Queens, NY', tweetParser.parseTextForAddress(testText2));
            assert.equal('2 Castle Hill Ave, Bronx, NY', tweetParser.parseTextForAddress(testText3));
            assert.equal('Verrazano-Narrows Bridge, Staten Island, NY', tweetParser.parseTextForAddress(testText4));
        });
    });

    describe('#getGeoFromTweet', function () {
        it('should successfully geocode a tweet from the second example', function (done) {
            setTimeout(done, 60000);
            tweetParser.parseGeoFromTweet(testText2, function (err, data) {
                assert.equal('247-14 South Conduit Avenue, Queens, NY 11422, USA', data.results[0].formatted_address);
                done();
            });
        });
        it('should successfully geocode a tweet from the third example', function (done) {
            setTimeout(done, 60000);
            tweetParser.parseGeoFromTweet(testText3, function (err, data) {
                assert.equal('2 Castle Hill Avenue, Bronx, NY 10473, USA', data.results[0].formatted_address);
                done();
            });
        });
        it('should successfully geocode a tweet from the fourth example', function (done) {
            setTimeout(done, 60000);
            tweetParser.parseGeoFromTweet(testText4, function (err, data) {
                assert.equal('Verrazano-Narrows Bridge, Staten Island, NY 10305, USA', data.results[0].formatted_address);
                done();
            });
        });
    });
})
