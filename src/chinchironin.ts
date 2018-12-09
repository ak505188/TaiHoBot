import { Player } from './Player';

export default class Chinchironin {
  private bet: number;
  private options = {
    printRoll: true,
    commandRoll: false,
    delayRoll: false
  };
  private player1: Player;
  private player2: Player;

  // Player 1 should be the user
  // Player 2 should be the bot or user

  constructor(bet: number, player1: Player, player2: Player) {
    this.bet = bet;
    this.player1 = player1;
    this.player2 = player2;
  }

  public start() {
    console.log(this.bet);
    console.log(`You won ${this.play()}!`);
  }

  // Returns score
  public doPlayerRolls(player: Player): number {
    let score: number;
    for (let i = 0; i < 3; i++) {
      const roll: number[] = this.roll();
      score = this.getScore(roll);
      if (this.options.printRoll) {
        console.log(player, player.name, player.getName());
        this.player1.print(`${player.getName()} has rolled ${roll}! Score is ${score}.`);
      }
      if (score !== 0) {
        return score;
      }
    }
    return score;
  }

  // Returns how much money the player won/lost
  public play(): number {
    const TaiHoScore = this.doPlayerRolls(this.player2);
    if (TaiHoScore < 0) {
      return TaiHoScore * -1 * this.bet;
    } else if (TaiHoScore > 6) {
      return TaiHoScore / -10 * this.bet;
    }

    const PlayerScore = this.doPlayerRolls(this.player1);

    if (PlayerScore < 0) {
      return PlayerScore * this.bet;
    } else if (PlayerScore > 6) {
      return PlayerScore / 10 * this.bet;
    }

    if (PlayerScore === TaiHoScore) {
      return 0;
    }
    if (PlayerScore > TaiHoScore) {
      return this.bet;
    }
    return this.bet * -1;
  }

  public roll(): number[] {
    const rolls: number[] = [];
    while (rolls.length < 3) {
      rolls.push(Math.floor((Math.random() * 6) + 1));
    }
    return rolls.sort();
  }

  private getScore(roll: number[]): number {
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
  }
}
