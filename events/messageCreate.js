const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
	if (!config.app.slashCommands && config.app.slashCommands !== '') {

		if (message.author.bot || message.channel.type === 'dm') return;

		const embed = new MessageEmbed();

		if (message.content.indexOf(prefix) !== 0) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

		if (cmd && cmd.permissions && !functions.Permission(message, cmd.permissions, cmd.name)) return;

		if (config.app.autoLanguage) {
			language = languages[functions.getLanguage(config, message)];
		}

		const roles = config.rolesGroup;

		for (role in roles) {

			if (cmd && roles[role].enabled && roles[role].commands.includes(cmd.name) && !message.member.permissions.has("ADMINISTRATOR")) {

				var rolearray = [];

				for (var y = 0; y < roles[role].roleName.length; y++) {
					if (roles[role].roleName[y]) {
						rolearray.push(message.guild.roles.cache.find(x => x.name === roles[role].roleName[y]).id);
					} else {
						return message.reply({ content: language.ROLE + ` ${roles[role].roleName.join(', ')} ` + language.NOT_EXIST + `.`, ephemeral: true});
					}
				}

				if (!message.member._roles.some(v => rolearray.includes(v))) {
					embed.setAuthor({ name: `${client.user.username} | Role`, iconURL: `${client.user.displayAvatarURL()}` });
					embed.setColor(config.app.color);
					embed.setDescription(language.THIS_COMMAND + ` ${roles[role].roleName.join(', ')} ` + language.ROLE_ON_SERVER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
					embed.setTimestamp();
					embed.setFooter({ text: language.USED_BY + ` ${message.user.username}`, iconURL: `${message.user.displayAvatarURL()}` });
					return message.channel.send({ embeds: [embed] });
				}
			}
		}

		if (cmd && cmd.voiceChannel) {
			if (!message.member.voice.channel) {
				embed.setAuthor({ name: `${client.user.username} | Voice`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.NOT_IN_CHANNEL + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.user.username}`, iconURL: `${message.user.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
			}

			if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
				embed.setAuthor({ name: `${client.user.username} | Voice`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.YOU_ARE_NOT + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				embed.setTimestamp();
				embed.setFooter({ text: language.USED_BY + ` ${message.user.username}`, iconURL: `${message.user.displayAvatarURL()}` });
				return message.channel.send({ embeds: [embed] });
			}
		}

		if (cmd) cmd.execute(client, message, args);
	}
};
