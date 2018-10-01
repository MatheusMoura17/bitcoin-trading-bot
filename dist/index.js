"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('ok');
});
app.listen(3000, function () {
    console.log('app rodando em 3000');
});
//# sourceMappingURL=index.js.map