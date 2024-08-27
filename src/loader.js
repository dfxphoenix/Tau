const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

languages = readdirSync('./languages/').filter(file => file.endsWith('.json'));

console.log(`Loading languages...`);

for (const file of languages) {
	const languageName = file.split('.')[0];
	const languageData = require(`../languages/${file}`);
	console.log(`-> Loaded language ${file.split('.')[0]}`);
	languages[languageName] = languageData;
	delete require.cache[require.resolve(`../languages/${file}`)];
};

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Loading events...`);

for (const file of events) {
	console.log(`-> Loaded event ${file.split('.')[0]}`);
	const event = require(`../events/${file}`);
	client.on(file.split('.')[0], event.bind(null, client));
	delete require.cache[require.resolve(`../events/${file}`)];
};

commands = [];

client.commands = new Collection();

console.log(`Loading commands...`);

if (config.app.slashCommands && config.app.slashCommands !== "") {
	readdirSync('./commands/slash/').forEach(dirs => {
		const commandFiles = readdirSync(`./commands/slash/${dirs}`).filter(files => files.endsWith('.js'));

		for (fileSlash of commandFiles) {
			const command = require(`../commands/slash/${dirs}/${fileSlash}`);
			if (command.name && command.description) {
				commands.push(command);
				console.log(`-> Loaded command ${command.name.toLowerCase()}`);
				client.commands.set(command.name.toLowerCase(), command);
				delete require.cache[require.resolve(`../commands/slash/${dirs}/${fileSlash}`)];
			} else console.log(`-> Failed Command ${command.name.toLowerCase()}`)
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