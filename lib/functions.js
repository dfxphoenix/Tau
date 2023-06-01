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

module.exports = { Permission };