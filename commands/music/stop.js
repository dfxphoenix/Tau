const { MessageEmbed } = require('discord.js');
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'stop',
    aliases: ['dc'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${client.user.username} | Stop`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        }

        queue.destroy();

        embed.setAuthor({ name: `${client.user.username} | Stop`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(client.config.app.color);
        embed.setDescription(language.MUSIC_STOPPED + ` ✅`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
        message.channel.send({ embeds: [embed] });
    },
};