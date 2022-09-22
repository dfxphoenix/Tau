function Permission(message, permission, command) {
	const permissions = message.channel.permissionsFor(message.client.user);

		if (permissions.has(permission)){
			return true;
		} else {
			return console.log("Error: No " + permission.join(' or ') + " permission detected on server " + message.guild.name + " while executing command " + command);
		}
}

module.exports = { Permission };