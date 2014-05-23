'use strict';

var express = require('express');
var logfmt = require('logfmt');
var rest = require('rest');
var app = express();

app.use(logfmt.requestLogger());

app.get('/contributions/:username', function (req, res) {
    rest('https://github.com/users/' + req.params.username + '/contributions_calendar_data')
    .then(function(response) {
        var results = response.entity || [];
        res.json(JSON.parse(results));
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function () {
    console.log('Listening on ' + port);
});
