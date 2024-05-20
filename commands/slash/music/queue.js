const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	description: 'show the playlist',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		if (!queue.tracks[0]) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_QUEUE + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);

		const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.displayName})`);

		const songs = queue.tracks.length;
		const nextSongs = songs > 5 ? language.AND + ` **${songs - 5}** ` + language.OTHER_SONGS + `...` : language.IN_PLAYLIST + ` **${songs}** ` + language.SONGS + `...`;

		embed.setDescription(language.CURRENT + ` ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};