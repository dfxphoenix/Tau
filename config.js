module.exports = {
    app: {
        px: '!',
        token: 'Token',
		id: 'ID',
        playing: 'music',
		port: 80,
		ip: '127.0.0.1',
		owner: 'Owner name',
		color: '#faa61a',
		language: 'en_US'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
