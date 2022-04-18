function canSend(message) {
	const permissions = message.channel.permissionsFor(message.client.user);

	if (permissions.has("SEND_MESSAGES")){
		return true;
	} else {
		return console.log("Error: No Send Messages permission detected");
	}
}

function canInteract(interaction) {
	const permissions = interaction.channel.permissionsFor(interaction.client.user);

	if (permissions.has("USE_APPLICATION_COMMANDS")){
		return true;
	} else {
		return console.log("Error: No Use Application Commands permission detected");
	}
}

module.exports = { canSend, canInteract };