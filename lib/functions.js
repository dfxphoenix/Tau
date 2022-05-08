function canSend(message) {
	const permissions = message.channel.permissionsFor(message.client.user);

	if (permissions.has("SEND_MESSAGES")){
		return true;
	} else {
		return console.log("Error: No Send Messages permission detected");
	}
}

module.exports = { canSend };