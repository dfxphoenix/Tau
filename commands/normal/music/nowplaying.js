const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'nowplaying',
	aliases: ['np'],
	utilisation: '{prefix}nowplaying',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Nowplaying`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		const track = queue.current;

		embed.setColor(config.app.color);
		embed.setThumbnail(track.thumbnail);
		embed.setAuthor({ name: `${client.user.displayName} | Nowplaying`, iconURL: `${client.user.displayAvatarURL()}` });

		const methods = ['disabled', 'track', 'queue'];

		const timestamp = queue.getPlayerTimestamp();
		const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

		embed.setDescription(language.NAME + ` **[${track.title}](${track.url})**\n` + language.VOLUME + ` **${queue.volume}**%\n` + language.DURATION + ` **${trackDuration}**\n` + language.LOOP_MODE + ` **${methods[queue.repeatMode]}**\n` + language.REQUESTED_BY + ` ${track.requestedBy}`);

		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		const saveButton = new MessageButton();

		saveButton.setLabel('Save this track');
		saveButton.setCustomId('saveTrack');
		saveButton.setStyle('SUCCESS');

		const row = new MessageActionRow().addComponents(saveButton);

		message.channel.send({ embeds: [embed], components: [row] });
	},
};