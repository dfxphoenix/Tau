module.exports = async (client) => {
	console.log(`Logged to the client ${client.user.username}\nReady on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

	client.user.setActivity(config.app.playing);
};