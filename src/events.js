const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed();

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    embed.setColor(client.config.app.color);
    embed.setDescription(language.STARTING_PLAYING + ` ${track.title} ` + language.IN + ` **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
    embed.setColor(client.config.app.color);
    embed.setDescription(language.TRACK + ` ${track.title} ` + language.ADDED_IN_QUEUE + ` ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription(language.MANUALLY_DISCONNECTED + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription(language.NOBODY_IS_ON_CHANNEL + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('queueEnd', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription(language.FINISHED_READING + ' ✅');
	queue.metadata.send({ embeds: [embed] });
});