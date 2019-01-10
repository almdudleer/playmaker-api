function buildReplayUrl(matchId, cluster, replaySalt) {
    return `http://replay${cluster}.valve.net/570/${matchId}_${replaySalt}.dem.bz2`;
}

function isRadiant(player) {
    return player.player_slot < 128;
}

module.exports = {
    buildReplayUrl,
    isRadiant
};
