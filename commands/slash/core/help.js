const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
	description: 'show list of commands',
    aliases: ['h'],
    showHelp: false,

    execute(interaction, client, message, args) {
        const embed = new MessageEmbed();

        const commands = interaction.client.commands.filter(x => x.showHelp !== false);

        embed.setAuthor({ name: `${interaction.client.user.username} | Help`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(language.LIST);
        embed.addField(language.COMMANDS + ` - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        interaction.reply({ embeds: [embed] });
    },
};