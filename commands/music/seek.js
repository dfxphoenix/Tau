const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'seek',
    aliases: [],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);
        const embed = new MessageEmbed();

		const time = args[1];

        if (!time) {
            embed.setAuthor({ name: `${client.user.username} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.TIME_INVALID + `... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        }

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${client.user.username} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        }

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) {
            embed.setAuthor({ name: `${client.user.username} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
            embed.setColor(client.config.app.color);
            embed.setDescription(language.TIME_HIGHER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌\n*` + language.VALID_TIME + ` **5s, 10s, 20 seconds, 1m**...*`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
            return message.channel.send({ embeds: [embed] });
        }

        await queue.seek(timeToMS);

        embed.setAuthor({ name: `${client.user.username} | Seek`, iconURL: `${client.user.displayAvatarURL()}` });
        embed.setColor(client.config.app.color);
        embed.setDescription(language.TIME_SET + ` **${ms(timeToMS, { long: true })}** ✅`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
        message.channel.send({ embeds: [embed] });
    },
};