var models = require('../models');

/*
 * GET list of all incidents.
 */
exports.index = function (req, res) {
    models.incident.where().limit(25).run(function (err, docs) {
        res.render('incidents', { title: 'NYC WTF', incidents: docs });
    });
};
