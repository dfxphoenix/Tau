const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'ping',
	aliases: [],
	utilisation: '{prefix}ping',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	execute(client, message) {
		const embed = new MessageEmbed();

		embed.setColor(config.app.color);
		embed.setAuthor({ name: `${client.user.displayName} | Ping`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setDescription(language.LAST_HB + ` ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ` + language.AGO + ` **${client.ws.ping}ms** 🛰️`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};