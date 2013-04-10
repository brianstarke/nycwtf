var models = require('../models');

/*
 * GET list of all incidents.
 */
exports.index = function (req, res) {
    res.render('incidents', { title: 'NYC WTF'});
};

exports.incidents = function (req, res) {
    models.incident.find().limit(25).exec(function (err, docs) {
        console.log("found " + docs.length);
        res.send(docs);
    });
}
