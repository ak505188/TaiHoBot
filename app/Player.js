"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var chinchironin_1 = require("./chinchironin");
var Player = /** @class */ (function () {
    function Player(name, print) {
        this.bits = 20000;
        this.name = name;
        if (print) {
            this.print = print;
        }
    }
    Player.prototype.play = function (bet, player) {
        if (bet > this.getBits()) {
            this.print('You do not have enough bits!');
            return;
        }
        var game = new chinchironin_1["default"](bet, this, player);
        var winnings = game.play();
        this.print("You won " + winnings);
        this.changeBits(winnings);
    };
    Player.prototype.getBits = function () {
        return this.bits;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.print = function (msg) {
        console.log(msg);
    };
    Player.prototype.changeBits = function (amount) {
        this.bits += amount;
        if (this.bits < 0) {
            this.bits = 0;
        }
    };
    return Player;
}());
exports.Player = Player;
var TaiHo = /** @class */ (function (_super) {
    __extends(TaiHo, _super);
    function TaiHo(print) {
        var _this = _super.call(this, 'Tai Ho', print) || this;
        _this.bits = 999999;
        return _this;
    }
    TaiHo.prototype.changeBits = function (amount) {
        if (amount === void 0) { amount = 0; }
        _super.prototype.changeBits.call(this, 0);
    };
    return TaiHo;
}(Player));
exports.TaiHo = TaiHo;
