module.exports = {
	app: {
		px: '!',
		slashCommands: true,
		token: 'Token',
		id: 'ID',
		playing: 'music',
		port: 80,
		ip: '127.0.0.1',
		slogan: 'Best Discord music bot',
		owner: 'Owner name',
		color: '#faa61a',
		language: 'en_US'
	},

	rolesGroup: {
		Normal: {
			enabled: false,
			roleName: ['DJ', 'VIP'],
			commands: ['back', 'clear', 'loop', 'seek', 'shuffle', 'skip', 'stop', 'volume']
		},
		Premium: {
			enabled: false,
			roleName: ['VIP'],
			commands: ['filter']
		},
	},

	opt: {
		maxVol: 100,
		loopMessage: false,
		playerOptions: {
			leaveOnEnd: true,
			leaveOnEmpty: false,
			autoSelfDeaf: true,
			spotifyBridge: true
		},
		discordPlayer: {
			ytdlOptions: {
				quality: 'highestaudio',
				highWaterMark: 1 << 25
			}
		}
	}
};
