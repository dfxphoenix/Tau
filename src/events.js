const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed();

player.on('error', (queue, error) => {
	console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
	console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
	if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
	embed.setColor(config.app.color);
	embed.setDescription(language.STARTING_PLAYING + ` ${track.title} ` + language.IN + ` **${queue.connection.channel.name}** 🎧`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('trackAdd', (queue, track) => {
	embed.setColor(config.app.color);
	embed.setDescription(language.THE_TRACK + ` ${track.title} ` + language.ADDED_IN_QUEUE + ` ✅`);
	queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
	embed.setColor(config.app.color);
	embed.setDescription(language.MANUALLY_DISCONNECTED + '... ❌');
	queue.metadata.send({ embeds: [embed] });
});

player.on('channelEmpty', (queue) => {
	if (config.opt.playerOptions.leaveOnEmpty && config.opt.playerOptions.leaveOnEmpty !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.NOBODY_IS_ON_CHANNEL + '... ❌');
		queue.metadata.send({ embeds: [embed] });
	}
});

player.on('queueEnd', (queue) => {
	if (config.opt.playerOptions.leaveOnEnd && config.opt.playerOptions.leaveOnEnd !== "") {
		embed.setColor(config.app.color);
		embed.setDescription(language.FINISHED_READING + ' ✅');
		queue.metadata.send({ embeds: [embed] });
	}
});

if (config.app.slashCommands && config.app.slashCommands !== "") {
	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;
		const command = client.commands.find(cmd => cmd.name.toLowerCase() == interaction.commandName);
		if (!command) return;
		if (!interaction.member.permissionsIn(interaction.channel).has(command.permission))
			return interaction.reply("You don't have permission to run this command!");
		const args = interaction.options._hoistedOptions.map(option => option.value);
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
			if (error) console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});
}