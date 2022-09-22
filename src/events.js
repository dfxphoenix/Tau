const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed();

player.on('error', (queue, error) => {
	console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
	console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
	if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.STARTING_PLAYING + ` ${track.title} ` + language.IN + ` **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.THE_TRACK + ` ${track.title} ` + language.ADDED_IN_QUEUE + ` ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.MANUALLY_DISCONNECTED + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
	if (config.opt.playerOptions.leaveOnEmpty && config.opt.playerOptions.leaveOnEmpty !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.NOBODY_IS_ON_CHANNEL + '... ❌');
		queue.metadata.send({ embeds: [embed] });
	}
});

player.on('queueEnd', (queue) => {
	if (!queue.metadata.permissionsFor(queue.metadata.client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
	if (config.opt.playerOptions.leaveOnEnd && config.opt.playerOptions.leaveOnEnd !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.FINISHED_READING + ' ✅');
		queue.metadata.send({ embeds: [embed] });
	}
});