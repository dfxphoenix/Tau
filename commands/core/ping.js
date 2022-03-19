const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const language = require(`../../languages/${client.config.app.language}.json`);

module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
    	const embed = new MessageEmbed();

    	embed.setColor(client.config.app.color);
        embed.setAuthor({ name: `${client.user.username} | Ping`, iconURL: `${client.user.displayAvatarURL()}` });
    	embed.setDescription(language.LAST_HB + ` ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ` + language.AGO + ` **${client.ws.ping}ms** 🛰️`);
        embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });

    	message.channel.send({ embeds: [embed] });
    },
};