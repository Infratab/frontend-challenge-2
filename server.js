var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var port = process.argv[2] || 3001;

app.listen(port, function () {
    'use strict';
    console.log('Server listening on port ' + port);
});