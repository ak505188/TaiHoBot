import * as tmi from 'tmi.js';
import * as config from './config';
import Chinchironin from './chinchironin'

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

const client = new tmi.client(options);

client.connect();

client.on('message', (channel, sender, message, fromSelf) => {
  if(fromSelf) { return };

  const betPat = /^!bet ([0-9]+)$/i;
  if (betPat.test(message)) {
    const result = new Chinchironin(parseInt(message.match(betPat)[1])).play();
    client.say(channel, `You won ${result}`)
      .catch((err) => { console.error(err) });
  }
});
