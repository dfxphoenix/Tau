const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ping',
	description: 'get ping of bot',
    permission: "SEND_MESSAGES",

    execute(interaction) {
    	const embed = new MessageEmbed();

    	embed.setColor(config.app.color);
        embed.setAuthor({ name: `${interaction.client.user.username} | Ping`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
    	embed.setDescription(language.LAST_HB + ` ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ` + language.AGO + ` **${client.ws.ping}ms** 🛰️`);
        embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    	interaction.reply({ embeds: [embed] });
    },
};