const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'nowplaying',
	description: 'show current music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Nowplaying`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		const track = queue.current;

		embed.setColor(config.app.color);
		embed.setThumbnail(track.thumbnail);
		embed.setAuthor({ name: `${interaction.client.user.displayName} | Nowplaying`, iconURL: `${interaction.client.user.displayAvatarURL()}` });

		const methods = ['disabled', 'track', 'queue'];

		const timestamp = queue.getPlayerTimestamp();
		const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

		embed.setDescription(language.NAME + ` **[${track.title}](${track.url})**\n` + language.VOLUME + ` **${queue.volume}**%\n` + language.DURATION + ` **${trackDuration}**\n` + language.LOOP_MODE + ` **${methods[queue.repeatMode]}**\n` + language.REQUESTED_BY + ` ${track.requestedBy}`);

		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		const saveButton = new MessageButton();

		saveButton.setLabel('Save this track');
		saveButton.setCustomId('saveTrack');
		saveButton.setStyle('SUCCESS');

		const row = new MessageActionRow().addComponents(saveButton);

		interaction.reply({ embeds: [embed], components: [row] });
	},
};