"use strict";
exports.__esModule = true;
var chinchironin_1 = require("./chinchironin");
function messageHandler(channel, sender, message, fromSelf) {
    if (fromSelf) {
        return;
    }
    ;
    var betPat = /^!bet ([0-9]+)$/i;
    if (betPat.test(message)) {
        var result = new chinchironin_1["default"](parseInt(message.match(betPat)[1])).play();
        client.say('#z3r01337', "You won " + result)["catch"](function (err) { console.error(err); });
    }
}
exports.messageHandler = messageHandler;
;
