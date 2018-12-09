import Chinchironin from './chinchironin';

export class Player {
  public name: string;
  protected bits: number = 20000;

  constructor(name: string, print?: (string) => void) {
    this.name = name;
    if (print) {
      this.print = print;
    }
  }

  public play(bet: number, player: Player) {
    if (bet > this.getBits()) {
      this.print('You do not have enough bits!');
      return;
    }
    const game: Chinchironin = new Chinchironin(bet, this, player);
    const winnings = game.play();
    this.print(`You won ${winnings}`);
    this.changeBits(winnings);
  }

  public getBits(): number {
    return this.bits;
  }

  public getName(): string {
    return this.name;
  }

  public print(msg: string) {
    console.log(msg);
  }

  public changeBits(amount: number) {
    this.bits += amount;
    if (this.bits < 0) {
      this.bits = 0;
    }
  }

}

export class TaiHo extends Player {
  constructor(print?: (string) => void) {
    super('Tai Ho', print);
    this.bits = 999999;
  }

  public changeBits(amount: number = 0) {
    super.changeBits(0);
  }
}
