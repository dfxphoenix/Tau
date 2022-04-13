module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
            if (!queue || !queue.playing) return int.reply({ content: language.NO_MUSIC + `... ` + language.TRY_AGAIN + ` ❌`, ephemeral: true, components: [] });

            int.member.send(language.YOU_SAVED_TRACK + ` ${queue.current.title} | ${queue.current.author} ` + langauge.FROM_THE_SERVER + ` ${int.member.guild.name} ✅`).then(() => {
                return int.reply({ content: language.SENT_TITLE + ` ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: language.UNABLE_TO_SEND + `... ` + language.TRY_AGAIN + ` ❌`, ephemeral: true, components: [] });
            });
        }
    }
};