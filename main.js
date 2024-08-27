const { Client, Intents } = require('discord.js');
const { Player } = require('@bleah/discord-player');
const express = require('express');
const app = express();

config = require('./config');
functions = require('./lib/functions');

if (config.app.slashCommands && config.app.slashCommands !== "") {
	prefix = '/';
} else {
	prefix = config.app.px;
}

client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES
	],
	shards: 'auto',
	disableMentions: 'everyone'
});

player = new Player(client, config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

if (config.app.website.enabled) {
	app.set('trust proxy', true);
	app.use(express.static('website/assets'));
	app.engine('ejs', require('ejs').renderFile);
	app.set('view engine', 'ejs');
	app.set('views', __dirname);

	app.get('/', function(req, res) {
		const privateMode = config.app.privateMode;
		const id = config.app.id;
		const name = client.user.displayName;
		const avatar = client.user.displayAvatarURL();
		const slogan = config.app.slogan;
		const owner = config.app.owner;
		const year = new Date().getFullYear();
		const color = config.app.color;
		const guilds = client.guilds.cache.size;
		const users = client.users.cache.size;
		const channels = client.channels.cache.size;
		const language = languages[functions.getLanguage(config)];
		res.render(__dirname + '/website/index.ejs', {privateMode:privateMode,id:id,name:name,avatar:avatar,slogan:slogan,owner:owner,prefix:prefix,year:year,color:color,language:language,guilds:guilds,users:users,channels:channels});
	});

	if (!config.app.privateMode) {
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
	}

	app.get('*', function(req, res) {
		const name = client.user.displayName;
		const avatar = client.user.displayAvatarURL();
		const color = config.app.color;
		const language = languages[functions.getLanguage(config)];
		res.status(404).render(__dirname + '/website/404.ejs', {name:name,avatar:avatar,color:color,language:language});
	});

	const PORT = config.app.website.port;
	const IP = config.app.website.ip;
	app.listen(PORT, IP, () => {
		console.log(`Website listening on port ${PORT}`);
	});
}

language = languages[functions.getLanguage(config)];

client.login(config.app.token);