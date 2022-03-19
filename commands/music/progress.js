const { MessageEmbed } = require('discord.js');
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'progress',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${client.user.username} | Progress`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        } 

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') {
            embed.setAuthor({ name: `${client.user.username} | Progress`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.PLAYING_LIVE + ` 🎧`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        } 

        embed.setAuthor({ name: `${client.user.username} | Progress`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(client.config.app.color);
        embed.setDescription(`${progress} (**${timestamp.progress}**%)`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
        message.channel.send({ embeds: [embed] });
    },
};