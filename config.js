module.exports = {
    app: {
        px: 'b!',
        slashCommands: true,
        token: 'OTYzOTU4NzA2ODQ2OTkwNDQ2.YldqgQ.cfSVdSTY5nCmgaYynob-M9ynizA',
        id: '963958706846990446',
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
