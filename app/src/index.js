"use strict";
exports.__esModule = true;
var tmi = require("tmi.js");
var config = require("./config");
var chinchironin_1 = require("./chinchironin");
var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: config.nickname,
        password: config.password
    },
    channels: config.channels
};
var client = new tmi.client(options);
client.connect();
client.on('message', function (channel, sender, message, fromSelf) {
    if (fromSelf) {
        return;
    }
    ;
    var betPat = /^!bet ([0-9]+)$/i;
    if (betPat.test(message)) {
        var result = new chinchironin_1["default"](parseInt(message.match(betPat)[1])).play();
        client.say('#z3r01337', "You won " + result)["catch"](function (err) { console.error(err); });
    }
});
