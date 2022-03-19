const { MessageEmbed } = require('discord.js');
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed()

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${client.user.username} | Skip`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        } 

        const success = queue.skip();

        embed.setAuthor({ name: `${client.user.username} | Skip`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(client.config.app.color);
        embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.SKIPPED + ` ✅` : language.SOMETHING_WRONG + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
        return message.channel.send({ embeds: [embed] });
    },
};