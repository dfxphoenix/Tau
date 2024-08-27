const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	description: 'clear playlist',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Clear`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		if (!queue.tracks[0]) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Clear`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC_QUEUE + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		await queue.clear();

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Clear`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.QUEUE_CLEARED + ` 🗑️`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.reply({ embeds: [embed] });
	},
};