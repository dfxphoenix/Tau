const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'shuffle',
	aliases: ['sh'],
	utilisation: '{prefix}shuffle',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed()

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Shuffle`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		if (!queue.tracks[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Shuffle`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_QUEUE + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		await queue.shuffle();

		embed.setAuthor({ name: `${client.user.displayName} | Shuffle`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.QUEUE_SHUFFLED + ` **${queue.tracks.length}** ` + language.SONGS + ` ! ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		return message.channel.send({ embeds: [embed] });
	},
};