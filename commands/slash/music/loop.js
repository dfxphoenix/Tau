const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
	description: 'repet current playlist',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    permission: "SEND_MESSAGES",
    voiceChannel: true,
	options: [
        { description: 'Queue', name: 'queue', required: true, type: 3 }
    ],

    execute(interaction) {
		const query = interaction.options.getString("queue");
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Loop`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        if (query.toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) {
				embed.setAuthor({ name: `${interaction.client.user.username} | Loop`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.DISABLE_CURRENT_MUSIC + ` (${config.app.px}loop) ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.reply({ embeds: [embed] });
			}

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            if (queue.repeatMode === 1) {
				embed.setAuthor({ name: `${interaction.client.user.username} | Loop`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(success ? language.REPEAT_MODE + ` **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** ` + language.QUEUE_REPEATED + ` 🔁` : language.SOMETHING_WRONG + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.reply({ embeds: [embed] });
			}

		} else if (queue.repeatMode === 2) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Loop`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.DISABLE_CURRENT_QUEUE + ` (${config.app.px}loop queue) ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

        embed.setAuthor({ name: `${interaction.client.user.username} | Loop`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(success ? language.REPEAT_MODE + ` **${queue.repeatMode === 0 ? 'disabled' : 'enabled'}** ` + language.MUSIC_REPEATED_ENDLESSLY + ` 🔂` : language.SOMETHING_WRONG + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        return interaction.reply({ embeds: [embed] });

    },
};