function Permission(message, permission, command) {
	if (message.guild || message.client.guild) {
		const permissions = message.channel ? message.channel.permissionsFor(message.client.user) : message.permissionsFor(message.client.user);

		if (permissions.has(permission)){
			return true;
		} else {
			return console.log("Error: No " + permission.join(' or ') + " permission detected on server " + (message.guild ? message.guild.name : message.client.guild.name) + " while " + command);
		}
	} else {
		return true;
	}
}

function getLanguage(config, interaction) {
	let language;

	if (interaction) {
		if (interaction.guildLocale) {
			language = interaction.guildLocale;
		} else if (interaction.locale) {
			language = interaction.locale;
		} else if (interaction.preferredLocale) {
			language = interaction.preferredLocale;
		} else if (interaction.guild && interaction.guild.preferredLocale) {
			language = interaction.guild.preferredLocale;
		}
	}

	if (language) {
		language = language.includes('-') ? language.replace(/-/g, '_') : language + '_' + language.toUpperCase();

		if (languages.hasOwnProperty(language)) {
			return language;
		}
	}

	return config.app.language;
}

module.exports = { Permission, getLanguage };