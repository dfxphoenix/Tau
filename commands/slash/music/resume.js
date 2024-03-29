const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'resume',
	description: 'resume current music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue) {
			embed.setAuthor({ name: `${interaction.client.user.username} | Resume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		var success = queue.setPaused(false);

		embed.setAuthor({ name: `${interaction.client.user.username} | Resume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.RESUMED + ` ✅` : language.SOMETHING_WRONG + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ? ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		return interaction.reply({ embeds: [embed] });
	},
};