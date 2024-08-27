const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'seek',
	description: 'seeking a music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,
	options: [
		{ description: 'Time', name: 'time', required: true, type: 3 },
	],

	async execute(interaction) {
		const query = interaction.options.getString("time");
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		const time = query;

		if (!time || !ms(time)) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Seek`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.TIME_INVALID + `... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Seek`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const timeToMS = ms(time);

		if (timeToMS >= queue.current.durationMS) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Seek`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.TIME_HIGHER + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		await queue.seek(timeToMS);

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Seek`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.TIME_SET + ` **${ms(timeToMS, { long: true })}** ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.reply({ embeds: [embed] });
	},
};