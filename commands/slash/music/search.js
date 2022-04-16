const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
	description: 'search a music',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,
	options: [
        { description: 'Song name', name: 'song', required: true, type: 3 }
    ],

    async execute(interaction) {
		const query = interaction.options.getString("song");
		const embed = new MessageEmbed();

        const res = await player.search(query, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.NO_RESULTS_FOUND + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            return interaction.reply({ embeds: [embed] });
        }

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        embed.setColor(config.app.color);
        embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(language.RESULTS_FOR + ` ${args.join(' ')}\n\n${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n` + language.SELECT_CHOICE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel** ⬇️`);
        embed.setTimestamp();
        embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        interaction.reply({ embeds: [embed] });

        const collector = interaction.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === interaction.user.username.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') {
                embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
                embed.setColor(config.app.color);
                embed.setDescription(language.SEARCH_CANCELED + ` ✅`);
                embed.setTimestamp();
                embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
                return interaction.reply({ embeds: [embed] }) && collector.stop();
        }

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) {
                embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
                embed.setColor(config.app.color);
                embed.setDescription(language.INVALID_RESPONSE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel**... ` + language.TRY_AGAIN + ` ❌`);
                embed.setTimestamp();
                embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
                return interaction.reply({ embeds: [embed] });
        }

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(interaction.member.voice.channel);
            } catch {
                await player.deleteQueue(interaction.guild.id);
                embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
                embed.setColor(config.app.color);
                embed.setDescription(language.JOIN_VOICE_CHANNEL + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
                embed.setTimestamp();
                embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
                return interaction.reply({ embeds: [embed] });
            }

            embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
            embed.setColor(config.app.color);
            embed.setDescription(language.LOADING_SEARCH + ` 🎧`);
            embed.setTimestamp();
            embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            await interaction.reply({ embeds: [embed] });

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') {
                embed.setAuthor({ name: `${interaction.client.user.username} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
                embed.setColor(config.app.color);
                embed.setDescription(language.SEARCH_TIME_OUT + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
                embed.setTimestamp();
                embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
                return interaction.reply({ embeds: [embed] });
			}
        });
    },
};