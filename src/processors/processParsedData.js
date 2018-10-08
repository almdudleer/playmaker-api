function processParsedData(entries, container, meta) {
    for(let i = 0; i < 10; i++){
        container.players[i].player_slot = i;
    }
    for (let i = 0; i < entries.length; i += 1) {
        const e = entries[i];
        parseEntry(e, container, meta);
    }
    return container;
}

function parseEntry(e, container, meta) {
    switch (e.type) {
        case "interval":
            const player = container.players[e.slot];
            if (e.time >= 0 && e.time % 60 === 0) {
                player.times.push(e.time);
                player.gold_t.push(e.gold);
                player.lh_t.push(e.lh);
                player.xp_t.push(e.xp);
                player.dn_t.push(e.denies);
            }
            if (e.time >= meta.game_start && e.time <= 600) {
                player.pos.push({
                    x: e.x,
                    y: e.y
                })
            }
            if (e.time === meta.game_end){
                player.obs_placed = e.obs_placed;
                player.sen_placed = e.sen_placed;
                player.rune_pickups = e.rune_pickups;
                player.towers_killed = e.towers_killed;
                player.roshans_killed = e.roshans_killed;
            }
            break;
    }
}

module.exports = processParsedData;
