const { MessageEmbed } = require('discord.js');

module.exports = (client, interaction) => {
	if (config.app.slashCommands && config.app.slashCommands !== "") {
		if (!functions.canSend(interaction)) return interaction.reply({ content: language.I_HAVE_NOT_PERMISSION + "!", ephemeral: true });
		if (!functions.canView(interaction)) return interaction.reply({ content: language.I_HAVE_NOT_PERMISSION + "!", ephemeral: true });

		if (!interaction.isCommand()) return;

		const embed = new MessageEmbed();

        const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

		if (!command) return;

		const roles = config.rolesGroup;

		for (role in roles) {

			if (command && roles[role].enabled && roles[role].commands.includes(command.name)) {

				var rolearray = [];

				for (var y = 0; y < roles[role].roleName.length; y++) {
					rolearray.push(interaction.guild.roles.cache.find(x => x.name === roles[role].roleName[y]).id);
				}

				for (var y = 0; y < roles[role].roleName.length; y++) {
					if (!rolearray.includes(interaction.member._roles[y])) {
						embed.setAuthor({ name: `${interaction.client.user.username} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
						embed.setColor(config.app.color);
						embed.setDescription(language.THIS_COMMAND + ` ${roles[role].roleName} ` + language.ROLE_ON_SERVER + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
						return interaction.reply({ embeds: [embed] });
					} else {
						break;
					}
				}
			}
		}

		if (command && command.voiceChannel) {
			if (!interaction.member.voice.channelId) {
				embed.setAuthor({ name: `${interaction.client.user.username} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.NOT_IN_CHANNEL + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
				return interaction.reply({ embeds: [embed] });
			}

			if (interaction.guild.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
				embed.setAuthor({ name: `${interaction.client.user.username} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.YOU_ARE_NOT + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
				return interaction.reply({ embeds: [embed] });
			}
		}

		try {
			command.execute(interaction);
		} catch (error) {
			if (error) console.log(error);
			interaction.reply({ content: language.THERE_WAS_AN_ERROR + "!", ephemeral: true });
		}
	}
};
