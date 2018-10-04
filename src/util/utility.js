

function buildReplayUrl(matchId, cluster, replaySalt) {
    return `http://replay${cluster}.valve.net/570/${matchId}_${replaySalt}.dem.bz2`;
}

module.exports = {
  buildReplayUrl
};
