var fs = require("fs");
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var flash = require('connect-flash');
var routes = require('./routes/index');


var app = express();

app.use(favicon());
app.use(logger({stream: accessLogfile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', routes);

// development error handler
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        var meta = '[' + new Date() + ']' + req.url + '\n';
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + ']' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
});


app.listen(3001, function () {
    console.log("MePrint Statistics Server Start on Port 3000");
});
