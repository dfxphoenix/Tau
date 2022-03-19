const { MessageEmbed } = require("discord.js");
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setAuthor({ name: `${client.user.username} | Help`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(client.config.app.color);
        embed.setDescription(language.LIST);
        embed.addField(language.COMMANDS + ` - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });

        message.channel.send({ embeds: [embed] });
    },
};