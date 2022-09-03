const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
	if (!config.app.slashCommands && config.app.slashCommands !== '') {
		if (!functions.canSend(message)) return;
		if (!functions.canView(message)) return;

		if (message.author.bot || message.channel.type === 'dm') return;

		const embed = new MessageEmbed();

		if (message.content.indexOf(prefix) !== 0) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

		const roles = config.rolesGroup;

		for (role in roles) {

			if (cmd && roles[role].enabled && roles[role].commands.includes(cmd.name)) {

				var rolearray = [];

				for (var y = 0; y < roles[role].roleName.length; y++) {
					rolearray.push(message.guild.roles.cache.find(x => x.name === roles[role].roleName[y]).id);
				}

				for (var y = 0; y < roles[role].roleName.length; y++) {
					if (!rolearray.includes(message.member._roles[y])) {
						embed.setAuthor({ name: `${client.user.username} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
						embed.setColor(config.app.color);
						embed.setDescription(language.THIS_COMMAND + ` ${roles[role].roleName} ` + language.ROLE_ON_SERVER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
						return message.channel.send({ embeds: [embed] });
					} else {
						break;
					}
				}
			}
		}

		if (cmd && cmd.voiceChannel) {
			if (!message.member.voice.channel) {
				embed.setAuthor({ name: `${client.user.username} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.NOT_IN_CHANNEL + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				return message.channel.send({ embeds: [embed] });
			}

			if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
				embed.setAuthor({ name: `${client.user.username} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.YOU_ARE_NOT + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				return message.channel.send({ embeds: [embed] });
			}
		}

		if (cmd) cmd.execute(client, message, args);
	}
};
