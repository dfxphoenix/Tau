function canSend(message) {
	const permissions = message.channel.permissionsFor(message.client.user);

	if (permissions.has("SEND_MESSAGES")){
		return true;
	} else {
		return console.log("Error: No Send Messages permission detected");
	}
}

function canView(message) {
	const permissions = message.channel.permissionsFor(message.client.user);

	if (permissions.has("VIEW_CHANNEL")){
		return true;
	} else {
		return console.log("Error: No View Channel permission detected");
	}
}

module.exports = { canSend, canView };