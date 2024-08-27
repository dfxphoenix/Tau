const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'filter',
	aliases: [],
	utilisation: '{prefix}filter [filter name]',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,

	async execute(client, message, args) {
		const queue = player.getQueue(message.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${client.user.displayName} | Filter`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const actualFilter = queue.getFiltersEnabled()[0];

		if (!args[0]) {
			embed.setAuthor({ name: `${client.user.displayName} | Filter`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_FILTER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌\n` + `${actualFilter ? `${language.FILTER_ACTIVE} **${actualFilter}** (${prefix}filter ${actualFilter} ${language.TO_DISABLE}).\n` : ''}`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const filters = [];

		queue.getFiltersEnabled().map(x => filters.push(x));
		queue.getFiltersDisabled().map(x => filters.push(x));

		const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

		if (!filter) {
			embed.setAuthor({ name: `${client.user.displayName} | Filter`, iconURL: `${client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.FILTER_DOESNT_EXIST + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌\n${actualFilter ? `${language.FILTER_ACTIVE} **${actualFilter}**.\n` : ''}${language.LIST_AVAILABLE_FILTERS} ${filters.map(x => `**${x}**`).join(', ')}.`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
			return message.channel.send({ embeds: [embed] });
		}

		const filtersUpdated = {};

		filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

		await queue.setFilters(filtersUpdated);

		embed.setAuthor({ name: `${client.user.displayName} | Filter`, iconURL: `${client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.THE_FILTER + ` ${filter} ` + language.IS_NOW + ` **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*` + language.REMINDER_THE_LONGER + `*`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${message.author.displayName}`, iconURL: `${message.author.displayAvatarURL()}` });
		message.channel.send({ embeds: [embed] });

	},
};