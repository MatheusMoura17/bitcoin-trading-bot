var express = require('express');
var path = require('path');

var app = express();
var Trader = require('./server/tasks/trader');

Trader.start();

app.set('views', path.join(__dirname, 'client', 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
