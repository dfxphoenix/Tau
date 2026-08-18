const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	aliases: ['q'],
	utilisation: '{prefix}queue',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue) {
			embed.setAuthor({ name: `${client.user.displayName} | Queue`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		if (!queue.tracks[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Queue`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_QUEUE + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		embed.setAuthor({ name: `${client.user.displayName} | Queue`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);

		const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.displayName})`);

		const songs = queue.tracks.length;
		const nextSongs = songs > 5 ? language.AND + ` **${songs - 5}** ` + language.OTHER_SONGS + `...` : language.IN_PLAYLIST + ` **${songs}** ` + language.SONGS + `...`;

		embed.setDescription(language.CURRENT + ` ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};