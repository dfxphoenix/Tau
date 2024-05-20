const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'help',
	aliases: ['h'],
	showHelp: false,
	utilisation: '{prefix}help',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],

	execute(client, message) {
		const embed = new MessageEmbed();

		const commands = client.commands.filter(x => x.showHelp !== false);

		embed.setAuthor({ name: `${client.user.displayName} | Help`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.LIST);
		embed.addFields({ name: language.COMMANDS + ` - ${commands.size}`, value: commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '`'}`).join(' | ') });
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });
	},
};