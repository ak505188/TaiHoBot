var Chinchironin = (function () {
    function Chinchironin(bet, autoRoll) {
        if (autoRoll === void 0) { autoRoll = false; }
        this.bet = bet;
    }
    Chinchironin.prototype.start = function () {
        console.log("You won " + this.play() + "!");
    };
    // Returns score
    Chinchironin.prototype.doPlayerRolls = function (playerName) {
        var score;
        for (var i = 0; i < 3; i++) {
            var roll = this.roll();
            score = this.getScore(roll);
            if (playerName) {
                console.log(playerName + " has rolled " + roll + "! Score is " + score + ".");
            }
            if (score !== 0) {
                return score;
            }
        }
        return score;
    };
    // Returns how much money the player won/lost
    Chinchironin.prototype.play = function () {
        var TaiHoScore = this.doPlayerRolls('Tai Ho');
        if (TaiHoScore < 0) {
            return TaiHoScore * -1 * this.bet;
        }
        else if (TaiHoScore > 6) {
            return TaiHoScore / -10 * this.bet;
        }
        var PlayerScore = this.doPlayerRolls('Player');
        if (PlayerScore < 0) {
            return PlayerScore * this.bet;
        }
        else if (PlayerScore > 6) {
            return PlayerScore / 10 * this.bet;
        }
        if (PlayerScore === TaiHoScore) {
            return 0;
        }
        if (PlayerScore > TaiHoScore) {
            return this.bet;
        }
        return this.bet * -1;
    };
    Chinchironin.prototype.roll = function () {
        var rolls = [];
        while (rolls.length < 3) {
            rolls.push(Math.floor((Math.random() * 6) + 1));
        }
        return rolls.sort();
    };
    Chinchironin.prototype.getScore = function (roll) {
        // Input must be a sorted array of 3 ints between 1 & 6
        // Scores
        // -3  = lose triple
        // -2  = lose triple
        // -1  = missed bowl (lose bet)
        // 0   = no score
        // 1-6 = score 1-6
        // 20  = win double
        // 30  = win triple
        if (roll[0] === roll[1] && roll[1] === roll[2]) {
            return roll[0] === 1 ? -3 : 30;
        }
        if (roll[0] === 1 && roll[1] === 2 && roll[2] === 3) {
            return -2;
        }
        if (roll[0] === 4 && roll[1] === 5 && roll[2] === 6) {
            return 20;
        }
        if (roll[0] === roll[1]) {
            return roll[2];
        }
        if (roll[1] === roll[2]) {
            return roll[0];
        }
        return 0;
    };
    return Chinchironin;
}());
var c = new Chinchironin(1000);
c.start();
