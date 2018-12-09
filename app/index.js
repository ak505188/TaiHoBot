"use strict";
exports.__esModule = true;
var tmi = require("tmi.js");
var config = require("./config");
var Player_1 = require("./Player");
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
var players = {};
var taiho = new Player_1.TaiHo();
var client = new tmi.client(options);
client.connect();
client.on('message', function (channel, sender, message, fromSelf) {
    if (fromSelf) {
        return;
    }
    ;
    var betPat = /^!bet ([0-9]+)$/i;
    if (betPat.test(message)) {
        var playerExists = players.hasOwnProperty(sender);
        var player = playerExists ? players[sender]
            : new Player_1.Player(sender['display-name'], function (msg) {
                client.say(channel, msg)["catch"](function (err) { console.error(err); });
            });
        var bet = parseInt(message.match(betPat)[1]);
        player.play(bet, taiho);
    }
    var bitsPat = /^!bits$/i;
    if (bitsPat.test(message)) {
        var playerExists = players.hasOwnProperty(sender);
        var player = playerExists ? players[sender]
            : new Player_1.Player(sender['display-name'], function (msg) {
                client.say(channel, msg)["catch"](function (err) { console.error(err); });
            });
        client.say(channel, "@" + player.getName() + ", you have " + player.getBits() + " bits!");
    }
});
