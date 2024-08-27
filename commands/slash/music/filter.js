const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'filter',
	description: 'set filters to music',
	permissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
	voiceChannel: true,
	options: [
		{ description: 'Name of filter', name: 'filter', required: false, type: 3 }
	],

	async execute(interaction) {
		const query = interaction.options.getString("filter");
		const queue = player.getQueue(interaction.guild.id);
		const embed = new MessageEmbed();

		if (!queue || !queue.playing) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Filter`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.NO_MUSIC + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const actualFilter = queue.getFiltersEnabled()[0];

		if (!query) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Filter`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.VALID_FILTER + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌\n` + `${actualFilter ? `${language.FILTER_ACTIVE} **${actualFilter}** (${prefix}filter ${actualFilter} ${language.TO_DISABLE}).\n` : ''}`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const filters = [];

		queue.getFiltersEnabled().map(x => filters.push(x));
		queue.getFiltersDisabled().map(x => filters.push(x));

		const filter = filters.find((x) => x.toLowerCase() === query.toLowerCase());

		if (!filter) {
			embed.setAuthor({ name: `${interaction.client.user.displayName} | Filter`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
			embed.setColor(config.app.color);
			embed.setDescription(language.FILTER_DOESNT_EXIST + ` ${interaction.user.displayName}... ` + language.TRY_AGAIN + ` ❌\n${actualFilter ? `${language.FILTER_ACTIVE} **${actualFilter}**.\n` : ''}${language.LIST_AVAILABLE_FILTERS} ${filters.map(x => `**${x}**`).join(', ')}.`);
			embed.setTimestamp();
			embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
			return interaction.reply({ embeds: [embed] });
		}

		const filtersUpdated = {};

		filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

		await queue.setFilters(filtersUpdated);

		embed.setAuthor({ name: `${interaction.client.user.displayName} | Filter`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
		embed.setColor(config.app.color);
		embed.setDescription(language.THE_FILTER + ` ${filter} ` + language.IS_NOW + ` **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*` + language.REMINDER_THE_LONGER + `*`);
		embed.setTimestamp();
		embed.setFooter({ text: language.USED_BY + ` ${interaction.user.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}` });
		interaction.reply({ embeds: [embed] });

	},
};