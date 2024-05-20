const { MessageEmbed } = require('discord.js');
const { QueryType } = require('@bleah/discord-player');

module.exports = {
	name: 'play',
	description: 'play a music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,
	options: [
		{ description: 'URL or song name', name: 'track', required: false, type: 3 }
	],

	async execute(interaction) {
		const query = interaction.options.getString("track");
		const embed = new MessageEmbed();

		if (!query) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_SEARCH + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const res = await player.search(query, {
			requestedBy: interaction.member,
			searchEngine: QueryType.AUTO
		});

		if (!res || !res.tracks.length) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
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

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.LOADING + ` ${res.playlist ? language.PLAYLIST : language.TRACK}... 🎧`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.reply({ embeds: [embed] });

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		} catch {
			await player.deleteQueue(interaction.guild.id);
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.JOIN_VOICE + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.channel.send({ embeds: [embed] });
		}

		res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

		if (!queue.playing) await queue.play();
	},
};