const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
	if (!config.app.slashCommands && config.app.slashCommands !== '' && functions.canSend(message)) {
		if (message.author.bot || message.channel.type === 'dm') return;

		const embed = new MessageEmbed();

		if (message.content.indexOf(prefix) !== 0) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

		const DJ = config.opt.DJ;

		if (cmd && DJ.enabled && DJ.commands.includes(cmd.name)) {
			for (var y = 0; y < DJ.roleName.length; y++) {
				var roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName[y]);
			}

			if (!message.member._roles.includes(roleDJ.id)) {
				embed.setAuthor({ name: `${client.user.username} | Play`, iconURL: `${client.user.displayAvatarURL()}` });
				embed.setColor(config.app.color);
				embed.setDescription(language.THIS_COMMAND + ` ${DJ.roleName} ` + language.ROLE_ON_SERVER + ` ${message.author}... ` + language.TRY_AGAIN + ` ❌`);
				return message.channel.send({ embeds: [embed] });
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
