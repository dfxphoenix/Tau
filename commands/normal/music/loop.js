const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('@bleah/discord-player');

module.exports = {
	name: 'loop',
	aliases: ['lp', 'repeat'],
	utilisation: '{prefix}loop <queue>',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message, args) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Loop`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		if (args.join('').toLowerCase() === 'queue') {
			if (queue.repeatMode === 1) {
				embed.setAuthor({ name: `${client.user.displayName} | Loop`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.DISABLE_CURRENT_MUSIC + ` (${prefix}loop) ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
			}

			const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

			embed.setAuthor({ name: `${client.user.displayName} | Loop`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(success ? language.REPEAT_MODE + ` **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** ` + language.QUEUE_REPEATED + ` 🔁` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });

		} else if (queue.repeatMode === 2) {
			embed.setAuthor({ name: `${client.user.displayName} | Loop`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.DISABLE_CURRENT_QUEUE + ` (${prefix}loop queue) ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

		embed.setAuthor({ name: `${client.user.displayName} | Loop`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(success ? language.REPEAT_MODE + ` **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** ` + language.MUSIC_REPEATED_ENDLESSLY + ` 🔂` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		return message.channel.send({ embeds: [embed] });

	},
};