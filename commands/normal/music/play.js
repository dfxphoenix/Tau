const { MessageEmbed } = require('discord.js');
const { QueryType } = require('@bleah/discord-player');

module.exports = {
	name: 'play',
	aliases: ['p'],
	utilisation: '{prefix}play [song name/URL]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(client, message, args) {
		const embed = new MessageEmbed();

		if (!args[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_SEARCH + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const res = await player.search(args.join(' '), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO
		});

		if (!res || !res.tracks.length) {
			embed.setAuthor({ name: `${client.user.displayName} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_RESULTS_FOUND + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const queue = await player.createQueue(message.guild, {
			metadata: message.channel,
			bufferingTimeout: 1000,
			leaveOnEnd: config.opt.playerOptions.leaveOnEnd,
			leaveOnEmpty: config.opt.playerOptions.leaveOnEmpty,
			autoSelfDeaf: config.opt.playerOptions.autoSelfDeaf,
			spotifyBridge: config.opt.playerOptions.spotifyBridge
		});

		embed.setAuthor({ name: `${client.user.displayName} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.LOADING + ` ${res.playlist ? language.PLAYLIST : language.TRACK}... 🎧`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		message.channel.send({ embeds: [embed] });

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel);
		} catch {
			await player.deleteQueue(message.guild.id);
			embed.setAuthor({ name: `${client.user.displayName} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.JOIN_VOICE + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

		if (!queue.playing) await queue.play();
	},
};