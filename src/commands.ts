import { Player } from './Player';

// Command '!bits'
// Tell user how many bits they have
function bits(player: Player) {
  player.print(`${player.name} has ${player.getBits()} bits.`);
}

// Command '!give $display_name'
// Gives player with that display name free bits.
// Should only be issued by OP users
// TODO: add check for OP
function give(player: Player, amount: number) {
  player.changeBits(amount);
  player.print(`${player.name} has been given ${amount} bits!`);
}

// Command 'bet $number'
// Bet $number on a game of chinchironin!
function bet(player: Player, player2, Player, bet: number) {
  player.play(bet, player2);
}

