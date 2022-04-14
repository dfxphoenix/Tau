const { MessageEmbed } = require('discord.js');
const language = require(`../../../languages/${config.app.language}.json`);

module.exports = {
    name: 'shuffle',
	description: 'queue shuffled one music',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed()

        if (!queue || !queue.playing) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Shuffle`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }

        if (!queue.tracks[0]) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Shuffle`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC_QUEUE + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }

        await queue.shuffle();

        embed.setAuthor({ name: `${interaction.client.user.username} | Shuffle`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);
        embed.setDescription(language.QUEUE_SHUFFLED + ` **${queue.tracks.length}** ` + language.SONGS + ` ! ✅`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        return interaction.reply({ embeds: [embed] });
    },
};