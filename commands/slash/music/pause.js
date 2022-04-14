const { MessageEmbed } = require('discord.js');
const language = require(`../../../languages/${config.app.language}.json`);

module.exports = {
    name: 'pause',
	description: 'pause current music',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed();

        if (!queue) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Pause`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        const success = queue.setPaused(true);

        embed.setAuthor({ name: `${interaction.client.user.username} | Pause`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.PAUSED + ` ✅` : `` + language.SOMETHING_WRONG + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({ embeds: [embed] });
    },
};