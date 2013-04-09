var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var Incident = new Schema({
    description: String,
    formattedAddress: String,
    geoLat: Number,
    geoLng: Number,
    source: String,
    postingKey: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = Incident;