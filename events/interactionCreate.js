const { MessageEmbed } = require('discord.js');

client.on('interactionCreate', async interaction => {
	if (config.app.slashCommands && config.app.slashCommands !== "") {
		if (!functions.canSend(interaction) && !functions.canView(interaction)) return interaction.reply({ content: language.I_HAVE_NOT_PERMISSION + "!", ephemeral: true });

		if (!interaction.isCommand()) return;

		const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

		if (!command) return;

		const embed = new MessageEmbed();

		const DJ = config.opt.DJ;

		if (command && DJ.enabled && DJ.commands.includes(command.name)) {

			for (var y = 0; y < DJ.roleName.length; y++) {
				var roleDJ = interaction.guild.roles.cache.find(x => x.name === DJ.roleName[y]);
			}

			if (!interaction.member._roles.includes(roleDJ.id)) {
				embed.setAuthor({ name: `${interaction.client.user.username} | Play`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.THIS_COMMAND + ` ${DJ.roleName} ` + language.ROLE_ON_SERVER + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
				return interaction.reply({ embeds: [embed] });
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
			await command.execute(interaction);
		} catch (error) {
			if (error) console.log(error);
			await interaction.reply({ content: language.THERE_WAS_AN_ERROR + "!", ephemeral: true });
		}
	}
});
