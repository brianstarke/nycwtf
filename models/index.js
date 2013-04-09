var IncidentModel = require('./incident'),
    mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI;

// Load models
exports.incident = mongoose.model('incident', IncidentModel);

// Make connection asynchronously.
mongoose.connect(mongoUri, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + mongoUri + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + mongoUri);
    }
});