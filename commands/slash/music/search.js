const { MessageEmbed } = require('discord.js');
const { QueryType } = require('@bleah/discord-player');

module.exports = {
	name: 'search',
	description: 'search a music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
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
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_RESULTS_FOUND + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel,
			bufferingTimeout: 1000,
			leaveOnEnd: config.opt.playerOptions.leaveOnEnd,
			leaveOnEmpty: config.opt.playerOptions.leaveOnEmpty,
			autoSelfDeaf: config.opt.playerOptions.autoSelfDeaf,
			spotifyBridge: config.opt.playerOptions.spotifyBridge
		});

		embed.setColor(config.app.color);
		embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });

		const maxTracks = res.tracks.slice(0, 10);

		embed.setDescription(language.RESULTS_FOR + ` ${query}\n\n${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n` + language.SELECT_CHOICE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel** ⬇️`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });

		interaction.reply({ embeds: [embed] });

		const collector = interaction.channel.createMessageCollector({
			time: 15000,
			errors: ['time'],
			filter: m => m.author.id === interaction.user.id
		});

		collector.on('collect', async (query) => {
			if (query === 'cancel') {
				embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.SEARCH_CANCELED + ` ✅`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.channel.send({ embeds: [embed] }) && collector.stop();
		}

			const value = parseInt(query);

			if (!value || value <= 0 || value > maxTracks.length) {
				embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.INVALID_RESPONSE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel**... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.channel.send({ embeds: [embed] });
		}

			collector.stop();

			try {
				if (!queue.connection) await queue.connect(interaction.member.voice.channel);
			} catch {
				await player.deleteQueue(interaction.guild.id);
				embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.JOIN_VOICE + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.channel.send({ embeds: [embed] });
			}

			embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.LOADING_SEARCH + ` 🎧`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			await interaction.channel.send({ embeds: [embed] });

			queue.addTrack(res.tracks[query.content - 1]);

			if (!queue.playing) await queue.play();
		});

		collector.on('end', (msg, reason) => {
			if (reason === 'time') {
				embed.setAuthor({ name: `${interaction.client.user.displayName} | Search`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.SEARCH_TIME_OUT + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				return interaction.channel.send({ embeds: [embed] });
			}
		});
	},
};