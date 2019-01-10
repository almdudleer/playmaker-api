function processParsedData(entries, container, meta) {
    for (let i = 0; i < 10; i++) {
        container.players[i].player_slot = i;
        container.players[i].pre_pos = Array.from(Array(201), _ => Array(201).fill(0));
        container.players[i].hero_name = meta.slot_to_hero[i];
    }
    for (let i = 0; i < entries.length; i += 1) {
        const e = entries[i];
        parseEntry(e, container, meta);
    }

    return container;
}

function parseEntry(e, container, meta) {
    const player = container.players[e.slot];
    switch (e.type) {
        case "interval":
            if (e.time >= 0 && e.time % 60 === 0) {
                player.times.push(e.time);
                player.gold_t.push(e.gold);
                player.lh_t.push(e.lh);
                player.xp_t.push(e.xp);
                player.dn_t.push(e.denies);
            }
            if (e.time >= meta.game_start && e.time <= 600) {

                if (e.x && e.y)
                    player.pre_pos[e.x][e.y]++;
            }
            if (e.time === meta.game_end) {
                player.obs_placed = e.obs_placed;
                player.sen_placed = e.sen_placed;
                player.rune_pickups = e.rune_pickups;
                player.towers_killed = e.towers_killed;
                player.roshans_killed = e.roshans_killed;
            }
            break;
        case "obs":
            player.obs_log.push({
                time: e.time,
                x: e.x,
                y: e.y,
            });
            break;
    }
}

module.exports = processParsedData;
