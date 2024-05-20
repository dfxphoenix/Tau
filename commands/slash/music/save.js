const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'save',
	description: 'send in DM the music you listened to',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(interaction) {
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.YOU_SAVED_TRACK + ` ${queue.current.title} | ${queue.current.author} ` + language.FROM_THE_SERVER + ` ${interaction.guild.name} ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.user.send({ embeds: [embed] }).then(() => {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.SENT_TITLE + ` ✅`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed] });

		}).catch(error => {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.UNABLE_TO_SEND + ` ${interaction.user.displayName}... try again ? ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			interaction.reply({ embeds: [embed] });
		});
	},
};