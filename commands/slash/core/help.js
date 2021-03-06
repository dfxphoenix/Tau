const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'show list of commands',
	permission: "SEND_MESSAGES",
	showHelp: false,

	execute(interaction) {
		const embed = new MessageEmbed();

		const commands = interaction.client.commands.filter(x => x.showHelp !== false);

		embed.setAuthor({ name: `${interaction.client.user.username} | Help`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.LIST);
		embed.addField({ name: language.COMMANDS + ` - ${commands.size}`, value: commands.map(x => `${x.name}`).join(' | ') });
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};