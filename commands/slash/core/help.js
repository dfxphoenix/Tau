const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'show list of commands',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	showHelp: false,

	execute(interaction) {
		const embed = new MessageEmbed();

		const commands = interaction.client.commands.filter(x => x.showHelp !== false);

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Help`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.LIST);
		embed.addFields({ name: language.COMMANDS + ` - ${commands.size}`, value: commands.map(x => `${x.name}`).join(' | ') });
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });
	},
};