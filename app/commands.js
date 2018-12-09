"use strict";
exports.__esModule = true;
// Command '!bits'
// Tell user how many bits they have
function bits(player) {
    player.print(player.name + " has " + player.getBits() + " bits.");
}
// Command '!give $display_name'
// Gives player with that display name free bits.
// Should only be issued by OP users
// TODO: add check for OP
function give(player, amount) {
    player.changeBits(amount);
    player.print(player.name + " has been given " + amount + " bits!");
}
// Command 'bet $number'
// Bet $number on a game of chinchironin!
function bet(player, player2, Player, bet) {
    player.play(bet, player2);
}
