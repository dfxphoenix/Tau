const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'back',
	aliases: ['previous'],
	utilisation: '{prefix}back',
	permission: "SEND_MESSAGES",
	voiceChannel: true,

	async execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.username} | Back`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		if (!queue.previousTracks[1]) {
			embed.setAuthor({ name: `${client.user.username} | Back`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_BEFORE + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		await queue.back();

		embed.setAuthor({ name: `${client.user.username} | Back`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.PLAYING + ` ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
		message.channel.send({ embeds: [embed] });
	},
};