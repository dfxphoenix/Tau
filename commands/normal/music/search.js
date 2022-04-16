const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	name: 'search',
	aliases: ['sh'],
	utilisation: '{prefix}search [song name]',
	permission: "SEND_MESSAGES",
	voiceChannel: true,

	async execute(client, message, args) {
		const embed = new MessageEmbed();

		if (!args[0]) {
			embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.ENTER_VALID_SEARCH + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const res = await player.search(args.join(' '), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO
		});

		if (!res || !res.tracks.length) {
			embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_RESULTS_FOUND + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const queue = await player.createQueue(message.guild, {
			metadata: message.channel
		});

		embed.setColor(config.app.color);
		embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });

		const maxTracks = res.tracks.slice(0, 10);

		embed.setDescription(language.RESULTS_FOR + ` ${args.join(' ')}\n\n${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n` + language.SELECT_CHOICE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel** ⬇️`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });

		message.channel.send({ embeds: [embed] });

		const collector = message.channel.createMessageCollector({
			time: 15000,
			errors: ['time'],
			filter: m => m.author.id === message.author.id
		});

		collector.on('collect', async (query) => {
			if (query.content.toLowerCase() === 'cancel') {
				embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.SEARCH_CANCELED + ` ✅`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] }) && collector.stop();
		}

			const value = parseInt(query.content);

			if (!value || value <= 0 || value > maxTracks.length) {
				embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.INVALID_RESPONSE + ` **1** ` + language.AND + ` **${maxTracks.length}** ` + language.OR + ` **cancel**... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
		}

			collector.stop();

			try {
				if (!queue.connection) await queue.connect(message.member.voice.channel);
			} catch {
				await player.deleteQueue(message.guild.id);
				embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.JOIN_VOICE + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
			}

			embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.LOADING_SEARCH + ` 🎧`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
			await message.channel.send({ embeds: [embed] });

			queue.addTrack(res.tracks[query.content - 1]);

			if (!queue.playing) await queue.play();
		});

		collector.on('end', (msg, reason) => {
			if (reason === 'time') {
				embed.setAuthor({ name: `${client.user.username} | Search`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.SEARCH_TIME_OUT + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
			}
		});
	},
};