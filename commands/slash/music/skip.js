const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
	description: 'skipping current music',
    aliases: ['sk'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed()

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Skip`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }

        const success = queue.skip();
		
		if(success && queue.playing) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Skip`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(success ? language.CURRENT_MUSIC + ` ${queue.current.title} ` + language.SKIPPED + ` ✅` : language.SOMETHING_WRONG + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }
    },
};