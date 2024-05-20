const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'skip',
	aliases: ['sk'],
	utilisation: '{prefix}skip',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed()

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Skip`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const success = queue.skip();
		
		if(success && queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Skip`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.SKIPPED + ` ✅` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}
	},
};