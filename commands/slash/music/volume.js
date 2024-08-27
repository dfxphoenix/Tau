const { MessageEmbed } = require('discord.js');
const maxVol = config.opt.maxVol;

module.exports = {
	name: 'volume',
	description: 'set volume of music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,
	options: [
		{ description: 'Volume from 1 to 100', name: 'volume', required: true, type: 3 }
	],

	execute(interaction) {
		const query = interaction.options.getString("volume");
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Volume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		const vol = parseInt(query);

		if (!vol) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Volume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.CURRENT_VOLUME + ` ${queue.volume} 🔊\n*` + language.CHANGE_VOLUME + ` **1** ` + language.AND + ` **${maxVol}**.*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		} 

		if (queue.volume === vol) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Volume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VOLUME_IS_ALREADY + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		if (vol < 0 || vol > maxVol) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Volume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NUMBER_IS_NOT_VALID + ` **1** ` + language.AND + ` **${maxVol}** ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const success = queue.setVolume(vol);

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Volume`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(success ? language.VOLUME_MODIFIED + ` **${vol}**/**${maxVol}**% 🔊` : language.SOMETHING_WRONG + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		return interaction.reply({ embeds: [embed] });
	},
};