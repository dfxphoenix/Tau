const { MessageEmbed } = require('discord.js');
const language = require(`../../../languages/${config.app.language}.json`);

module.exports = {
    name: 'queue',
	description: 'show the playlist',
    aliases: ['q'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        const embed = new MessageEmbed();

        if (!queue) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        if (!queue.tracks[0]) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_MUSIC_QUEUE + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        } 

        const methods = ['', '🔁', '🔂'];

        embed.setAuthor({ name: `${interaction.client.user.username} | Queue`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
        embed.setColor(config.app.color);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? language.AND + ` **${songs - 5}** ` + language.OTHER_SONGS + `...` : language.IN_PLAYLIST + ` **${songs}** ` + language.SONGS + `...`;

        embed.setDescription(language.CURRENT + ` ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        interaction.reply({ embeds: [embed] });
    },
};