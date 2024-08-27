const { MessageEmbed } = require('discord.js');
const maxVol = config.opt.maxVol;

module.exports = {
	name: 'volume',
	aliases: ['vol'],
	utilisation: `{prefix}volume [1-${maxVol}]`,
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	execute(client, message, args) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Volume`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		const vol = parseInt(args[0]);

		if (!vol) {
			embed.setAuthor({ name: `${client.user.displayName} | Volume`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.CURRENT_VOLUME + ` ${queue.volume} 🔊\n*` + language.CHANGE_VOLUME + ` **1** ` + language.AND + ` **${maxVol}**.*`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		} 

		if (queue.volume === vol) {
			embed.setAuthor({ name: `${client.user.displayName} | Volume`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VOLUME_IS_ALREADY + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		if (vol < 0 || vol > maxVol) {
			embed.setAuthor({ name: `${client.user.displayName} | Volume`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NUMBER_IS_NOT_VALID + ` **1** ` + language.AND + ` **${maxVol}** ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const success = queue.setVolume(vol);

		embed.setAuthor({ name: `${client.user.displayName} | Volume`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(success ? language.VOLUME_MODIFIED + ` **${vol}**/**${maxVol}**% 🔊` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		return message.channel.send({ embeds: [embed] });
	},
};