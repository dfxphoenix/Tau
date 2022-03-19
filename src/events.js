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
    embed.setDescription(`Started playing ${track.title} in **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
    embed.setColor(client.config.app.color);
    embed.setDescription(`Track ${track.title} added in the queue ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription('I was manually disconnected from the voice channel, clearing queue... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription('Nobody is in the voice channel, leaving the voice channel... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('queueEnd', (queue) => {
    embed.setColor(client.config.app.color);
    embed.setDescription('I finished reading the whole queue ✅');
	queue.metadata.send({ embeds: [embed] });
});