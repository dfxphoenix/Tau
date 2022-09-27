const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed();

process.on('uncaughtException', function (err) {
	console.error(err);
});

player.on('error', (queue, error) => {
	console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
	console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["ViewChannel", "SendMessages"])) return console.log("Error: No ViewChannel or SendMessages permission detected on server " + queue.metadata.guild.name + " while player event");
	if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.STARTING_PLAYING + ` ${track.title} ` + language.IN + ` **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["ViewChannel", "SendMessages"])) return console.log("Error: No ViewChannel or SendMessages permission detected on server " + queue.metadata.guild.name + " while player event");
	embed.setColor(config.app.color);
	embed.setDescription(language.THE_TRACK + ` ${track.title} ` + language.ADDED_IN_QUEUE + ` ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["ViewChannel", "SendMessages"])) return console.log("Error: No ViewChannel or SendMessages permission detected on server " + queue.metadata.guild.name + " while player event");
	embed.setColor(config.app.color);
	embed.setDescription(language.MANUALLY_DISCONNECTED + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["ViewChannel", "SendMessages"])) return console.log("Error: No ViewChannel or SendMessages permission detected on server " + queue.metadata.guild.name + " while player event");
	if (config.opt.playerOptions.leaveOnEmpty && config.opt.playerOptions.leaveOnEmpty !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.NOBODY_IS_ON_CHANNEL + '... ❌');
		queue.metadata.send({ embeds: [embed] });
	}
});

player.on('queueEnd', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["ViewChannel", "SendMessages"])) return console.log("Error: No ViewChannel or SendMessages permission detected on server " + queue.metadata.guild.name + " while player event");
	if (config.opt.playerOptions.leaveOnEnd && config.opt.playerOptions.leaveOnEnd !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.FINISHED_READING + ' ✅');
		queue.metadata.send({ embeds: [embed] });
	}
});