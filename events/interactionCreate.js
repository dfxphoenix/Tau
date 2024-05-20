const { MessageEmbed } = require('discord.js');

module.exports = (client, interaction) => {
	if (config.app.slashCommands && config.app.slashCommands !== "") {

		if (interaction.isCommand()) {

			if (!interaction.guild) {
				return interaction.reply(language.ONLY_GUILD + "!");
			}

			const embed = new MessageEmbed();

			const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);

			if (!command) return;

			if (config.app.autoLanguage) {
				language = languages[functions.getLanguage(config, interaction)];
			}

			if (command && command.permissions && !functions.Permission(interaction, command.permissions, command.name)) return interaction.reply({ content: language.I_DO_NOT_HAVE_PERMISSION + "!", ephemeral: true });

			const roles = config.rolesGroup;

			for (role in roles) {

				if (command && roles[role].enabled && roles[role].commands.includes(command.name) && !interaction.member.permissions.has("ADMINISTRATOR")) {

					var rolearray = [];

					for (var y = 0; y < roles[role].roleName.length; y++) {
						if (roles[role].roleName[y]) {
							rolearray.push(interaction.guild.roles.cache.find(x => x.name === roles[role].roleName[y]).id);
						} else {
							return interaction.reply({ content: language.ROLE + ` ${roles[role].roleName.join(', ')} ` + language.NOT_EXIST + `.`, ephemeral: true });
						}
					}

					if (!interaction.member._roles.some(v => rolearray.includes(v))) {
						embed.setAuthor({ name: `${client.user.username} | Role`, iconURL: `${client.user.displayAvatarURL()}` });
						embed.setColor(config.app.color);
						embed.setDescription(language.THIS_COMMAND + ` ${roles[role].roleName.join(', ')} ` + language.ROLE_ON_SERVER + ` ${interaction.author}... ` + language.TRY_AGAIN + ` ❌`);
						embed.setTimestamp();
						embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
						return interaction.reply({ embeds: [embed] });
					}
				}
			}

			if (command && command.voiceChannel) {
				if (!interaction.member.voice.channelId) {
					embed.setAuthor({ name: `${interaction.client.user.username} | Voice`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.NOT_IN_CHANNEL + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
					return interaction.reply({ embeds: [embed] });
				}

				if (interaction.guild.members.me.voice.channel && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
					embed.setAuthor({ name: `${interaction.client.user.username} | Voice`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.YOU_ARE_NOT + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
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
	}

	if (interaction.isButton()) {

		const queue = player.getQueue(interaction.guildId);

		if (config.app.autoLanguage) {
			language = languages[functions.getLanguage(config, interaction)];
		}

		switch (interaction.customId) {
			case 'saveTrack': {
				const embed = new MessageEmbed();

				if (!queue || !queue.playing) {
					embed.setAuthor({ name: `${interaction.client.user.username} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.NO_MUSIC + ` ${interaction.user.username}... ` + language.TRY_AGAIN + ` ❌`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
					return interaction.reply({ embeds: [embed] });
				} 

				embed.setAuthor({ name: `${interaction.client.user.username} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.YOU_SAVED_TRACK + ` ${queue.current.title} | ${queue.current.author} ` + language.FROM_THE_SERVER + ` ${interaction.guild.name} ✅`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
				interaction.user.send({ embeds: [embed] }).then(() => {
					embed.setAuthor({ name: `${interaction.client.user.username} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.SENT_TITLE + ` ✅`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
					interaction.reply({ embeds: [embed] });

				}).catch(error => {
					embed.setAuthor({ name: `${interaction.client.user.username} | Save`, iconURL: `${interaction.client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.UNABLE_TO_SEND + ` ${interaction.user.username}... try again ? ❌`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
					interaction.reply({ embeds: [embed] });
				});
			}
		}
	}
};
