import Chinchironin from './chinchironin';

export class Player {
  public name: string;
  public bits: number = 20000;

  constructor(name: string) {
    this.name = name;
  }

  public play(bet: number, player?: Player, print?: () => void) {
    const game: Chinchironin = new Chinchironin(bet, this, player);
  }

  protected changeBits(amount: number) {
    this.bits += amount;
    if (this.bits < 0) {
      this.bits = 0;
    }
  }

}

export class TaiHo extends Player {
  constructor() {
    super('Tai Ho');
    this.bits = 999999;
  }

  protected changeBits(amount: number = 0) {
    super.changeBits(0);
  }
}
