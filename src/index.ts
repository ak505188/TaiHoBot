import * as tmi from 'tmi.js';
import * as config from './config';
import Chinchironin from './chinchironin'
import { Player , TaiHo } from './Player';

const options = {
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

const players: { [key: string]: Player } = {};
const taiho: TaiHo = new TaiHo();

const client = new tmi.client(options);

client.connect();

client.on('message', (channel, sender, message, fromSelf) => {
  if(fromSelf) { return };

  const betPat = /^!bet ([0-9]+)$/i;
  if (betPat.test(message)) {
    const playerExists: boolean = players.hasOwnProperty(sender);
    const player: Player = playerExists ? players[sender]
      : new Player(sender['display-name'], (msg) => {
        client.say(channel, msg)
        .catch((err) => { console.error(err) });
      });
    const bet: number = parseInt(message.match(betPat)[1]);
    player.play(bet, taiho);
  }

  const bitsPat = /^!bits$/i;
  if (bitsPat.test(message)) {
    const playerExists: boolean = players.hasOwnProperty(sender);
    const player: Player = playerExists ? players[sender]
      : new Player(sender['display-name'], (msg) => {
        client.say(channel, msg)
        .catch((err) => { console.error(err) });
      });
    client.say(channel, `@${player.getName()}, you have ${player.getBits()} bits!`);
  }
});
