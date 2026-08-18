const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'seek',
	aliases: [],
	utilisation: '{prefix}seek [time]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(client, message, args) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		const time = args.join(' ');

		if (!time || !ms(time)) {
			embed.setAuthor({ name: `${client.user.displayName} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.TIME_INVALID + `... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const timeToMS = ms(time);

		if (timeToMS >= queue.current.durationMS) {
			embed.setAuthor({ name: `${client.user.displayName} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.TIME_HIGHER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		await queue.seek(timeToMS);

		embed.setAuthor({ name: `${client.user.displayName} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.TIME_SET + ` **${ms(timeToMS, { long: true })}** ✅`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		message.channel.send({ embeds: [embed] });
	},
};