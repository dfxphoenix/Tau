const { Client, Intents } = require('discord.js');
const { Player } = require('discord-player');
const express = require('express');
const app = express();

config = require('./config');

language = require(`./languages/${config.app.language}.json`);

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
});

global.player = new Player(client, config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.login(config.app.token);
 
// sendFile will go here
app.use(express.static('website/assets'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res) {
  const id = config.app.id;
  const name = client.user.username;
  const avatar = client.user.displayAvatarURL();
  const owner = config.app.owner;
  if (config.app.slashCommands && config.app.slashCommands !== "") {
    var prefix = '/';
  } else {
    var prefix = config.app.px;
  }
  const year = new Date().getFullYear();
  const color = config.app.color;
  const guilds = client.guilds.cache.size;
  const users = client.users.cache.size;
  const channels = client.channels.cache.size;
  res.render(__dirname + '/website/index.ejs', {id:id,name:name,avatar:avatar,owner:owner,prefix:prefix,year:year,color:color,language:language,guilds:guilds,users:users,channels:channels});
});

app.get('/api', function(req, res) {
  const guilds = client.guilds.cache.size;
  const users = client.users.cache.size;
  const channels = client.channels.cache.size;

  res.send({
    'guilds': guilds,
    'users': users,
    'channels': channels
  });
});

app.get('/callback', function(req, res) {
  res.redirect(301, '/');
});

app.get('*', function(req, res) {
  const name = client.user.username;
  const avatar = client.user.displayAvatarURL();
  const color = config.app.color;
  res.status(404).render(__dirname + '/website/404.ejs', {name:name,avatar:avatar,color:color,language:language});
});

// Start the server
const PORT = process.env.PORT || config.app.port;
const IP = process.env.IP || config.app.ip;
app.listen(PORT, IP, () => {
  console.log(`Website listening on port ${PORT}`);
});