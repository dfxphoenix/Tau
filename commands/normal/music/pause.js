const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pause',
	aliases: [],
	utilisation: '{prefix}pause',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue) {
			embed.setAuthor({ name: `${client.user.displayName} | Pause`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		var success = queue.setPaused(true);

		embed.setAuthor({ name: `${client.user.displayName} | Pause`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.PAUSED + ` ✅` : `` + language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		message.channel.send({ embeds: [embed] });
	},
};