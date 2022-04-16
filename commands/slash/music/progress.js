const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'progress',
	description: 'show current playing time of current music',
    aliases: ['pbar'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Progress`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') {
            embed.setAuthor({ name: `${interaction.client.user.username} | Progress`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.PLAYING_LIVE + ` 🎧`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        embed.setAuthor({ name: `${interaction.client.user.username} | Progress`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(`${progress} (**${timestamp.progress}**%)`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({ embeds: [embed] });
    },
};