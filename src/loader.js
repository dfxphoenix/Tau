const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];

client.commands = new Collection();

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Loading events...`);

for (const file of events) {
	console.log(`-> Loaded event ${file.split('.')[0]}`);
	const event = require(`../events/${file}`);
	client.on(file.split('.')[0], event.bind(null, client));
	delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Loading commands...`);

if (config.app.slashCommands && config.app.slashCommands !== "") {
	readdirSync('./commands/slash/').forEach(dirs => {
		const commandFiles = readdirSync(`./commands/slash/${dirs}`).filter(files => files.endsWith('.js'));

		for (fileSlash of commandFiles) {
			const command = require(`../commands/slash/${dirs}/${fileSlash}`);
			commands.push(command);
			console.log(`-> Loaded command ${command.name.toLowerCase()}`);
			client.commands.set(command.name.toLowerCase(), command);
			delete require.cache[require.resolve(`../commands/slash/${dirs}/${fileSlash}`)];
		};
	});
} else {
	readdirSync('./commands/normal/').forEach(dirs => {
		const commandFiles = readdirSync(`./commands/normal/${dirs}`).filter(files => files.endsWith('.js'));

		for (fileNormal of commandFiles) {
			const command = require(`../commands/normal/${dirs}/${fileNormal}`);
			console.log(`-> Loaded command ${command.name.toLowerCase()}`);
			client.commands.set(command.name.toLowerCase(), command);
			delete require.cache[require.resolve(`../commands/normal/${dirs}/${fileNormal}`)];
		};
	});
}

if (config.app.slashCommands && config.app.slashCommands !== "") {
	client.once('ready', () => {
		const slashCommands = commands.map(fileSlash => ({
			name: fileSlash.name,
			description: fileSlash.description,
			options: fileSlash.options,
			defaultPermission: true
		}));
		const CLIENT_ID = config.app.id;
		const rest = new REST({version: '9'}).setToken(config.app.token);
		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(CLIENT_ID), {
						body: slashCommands
					},
				);
			} catch (error) {
				if (error) console.log(error);
			}
		})();
	});
} else {
	client.once('ready', () => {
		const normalCommands = commands.map(fileNormal => ({
			defaultPermission: false
		}));
		const CLIENT_ID = config.app.id;
		const rest = new REST({version: '9'}).setToken(config.app.token);
		(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(CLIENT_ID), {
						body: normalCommands
					},
				);
			} catch (error) {
				if (error) console.log(error);
			}
		})();
	});
}