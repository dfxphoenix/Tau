const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'resume',
	aliases: ['rs'],
	utilisation: '{prefix}resume',
	permission: "SEND_MESSAGES",
	voiceChannel: true,

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue) {
			embed.setAuthor({ name: `${client.user.username} | Resume`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		queue.setPaused(false);

		embed.setAuthor({ name: `${client.user.username} | Resume`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(succes ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.RESUMED + ` ✅` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ? ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
		return message.channel.send({ embeds: [embed] });
	},
};