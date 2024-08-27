const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'back',
	description: 'back the music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Back`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		if (!queue.previousTracks[1]) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Back`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_BEFORE + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		await queue.back();

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Back`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.PLAYING + ` ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.reply({ embeds: [embed] });
	},
};