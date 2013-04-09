var geocoder = require('geocoder');

module.exports.parseGeoFromTweet = function (tweet, callback) {
    var geocodeQuery = this.parseTextForAddress(tweet);

    geocoder.geocode(geocodeQuery, callback);
}


var parseTextForAddress = module.exports.parseTextForAddress = function (text) {
    var county = this.parseCountyFromText(text);
    var text = this.cleanupText(text);


    var startIdx = text.indexOf(':');
    var endIdx = findPossibleEndOfAddress(text);

    text = text.substr(0, endIdx);
    return text.substr(startIdx + 1, text.length).trim() + ", " + county + ", NY";
};

/**
 * Look for the possible ending of an address.. St, Ave., etc..
 *
 * @param text
 * @returns {*}
 */
var findPossibleEndOfAddress = module.exports.findPossibleEndOfAddress = function (text) {
    var possibleEndings = [
        'Ave',
        'St ',
        'St.',
        'Rd',
        'Bridge'
    ];

    for (var i in possibleEndings) {
        var idx = text.lastIndexOf(possibleEndings[i])

        if (idx > -1) {
            return idx + possibleEndings[i].length;
        }
    }

    return text.length;
};

var parseCountyFromText = module.exports.parseCountyFromText = function (text) {
    var idx = text.indexOf(':');

    if (idx > -1) {
        return text.substr(0, idx);
    } else {
        return ''
    }
};

var cleanupText = module.exports.cleanupText = function (text) {
    var newText = text.replace('&amp;', 'and');

    // remove Boxes, they mess with the geocoding
    var startIdx = newText.indexOf('Box');
    if (startIdx > -1) {
        var endIdx = newText.indexOf(' ', startIdx + 4);
        var first = newText.substr(0, startIdx);
        var second = newText.substr(endIdx + 1, newText.length)
        newText = first + second;
    }

    return newText;
};
