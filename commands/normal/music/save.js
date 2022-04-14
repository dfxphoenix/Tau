const { MessageEmbed } = require('discord.js');
const language = require(`../../../languages/${config.app.language}.json`);

module.exports = {
    name: 'save',
    aliases: ['sv'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${client.user.username} | Save`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        } 

        embed.setAuthor({ name: `${client.user.username} | Save`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(language.YOU_SAVED_TRACK + ` ${queue.current.title} | ${queue.current.author} ` + language.FROM_THE_SERVER + ` ${message.guild.name} ✅`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
        message.author.send({ embeds: [embed] }).then(() => {
            embed.setAuthor({ name: `${client.user.username} | Save`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.SENT_TITLE + ` ✅`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            message.channel.send({ embeds: [embed] });

        }).catch(error => {
            embed.setAuthor({ name: `${client.user.username} | Save`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.UNABLE_TO_SEND + ` ${message.author}... try again ? ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            message.channel.send({ embeds: [embed] });
        });
    },
};