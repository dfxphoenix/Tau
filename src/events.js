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
	if (!functions.Permission(queue.metadata, ["VIEW_CHANNEL", "SEND_MESSAGES"], "player event")) return;
	if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.STARTING_PLAYING + ` ${config.app.name} ` + language.IN + ` **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
	if (!functions.Permission(queue.metadata, ["VIEW_CHANNEL", "SEND_MESSAGES"], "player event")) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.THE_TRACK + ` ${config.app.name} ` + language.ADDED_IN_QUEUE + ` ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
	if (!functions.Permission(queue.metadata, ["VIEW_CHANNEL", "SEND_MESSAGES"], "player event")) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.MANUALLY_DISCONNECTED + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
	if (!functions.Permission(queue.metadata, ["VIEW_CHANNEL", "SEND_MESSAGES"], "player event")) return;
	if (config.opt.playerOptions.leaveOnEmpty && config.opt.playerOptions.leaveOnEmpty !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.NOBODY_IS_ON_CHANNEL + '... ❌');
		queue.metadata.send({ embeds: [embed] });
	}
});

player.on('queueEnd', (queue) => {
	if (!functions.Permission(queue.metadata, ["VIEW_CHANNEL", "SEND_MESSAGES"], "player event")) return;
	if (config.opt.playerOptions.leaveOnEnd && config.opt.playerOptions.leaveOnEnd !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.FINISHED_READING + ' ✅');
		queue.metadata.send({ embeds: [embed] });
	}
});