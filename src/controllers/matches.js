const Match = require('../models/match');
const Team = require('../models/team');
const Item = require('../models/item');
const http = require('http');
const mongoose = require('mongoose');
const axios = require('axios');
const steamApi = require('../steamEndpoints');
const Tournament = require('../models/tournament');
const parseReplay = require('../replayParser');
const ParsedMatch = require('../models/parsedMatch');
const heroNames = require('../util/heroes');
const abilities = require('../util/abilities');
require('dotenv').config();

exports.match_post_one = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //fetching data from Steam API
        const resp = await axios.get(steamApi.getMatchDetails, {
            params: {
                match_id: req.body.matchId,
                key: process.env.STEAM_API_KEY
            }
        });
        resp.data.result._id = resp.data.result.match_id;
        for (let i = 0; i < resp.data.result.players.length; i++) {
            resp.data.result.players[i].hero_name = heroNames[resp.data.result.players[i].hero_id].name;
            resp.data.result.players[i].ability_upgrades.forEach((ability) => {
                ability.name = abilities[ability.ability];
            });
        }

        const match = new Match(resp.data.result);
        let tournament = await Tournament.findOne({_id: req.body.tournamentId})
            .populate('teams')
            .select('winnerTeam finished name teamCount prizePool teams bracket owner description')
            .session(session);
        if (!tournament) res.status(404).json({successful: false, message: 'Not found'});
        const team1 = await Team.findById(tournament.bracket[req.body.matchNum - 1].team1).session(session);
        const team2 = await Team.findById(tournament.bracket[req.body.matchNum - 1].team2).session(session);
        //Матч может запостить один из капитанов, если матч еще не был завершен
        //Владелец турнира может запостить даже завершенный матч, обновив его
        if (!(tournament.owner.equals(req.user._id) ||
            ((team1.captain.equals(req.user._id) || team2.captain.equals(req.user._id))
                && !tournament.bracket[req.body.matchNum - 1].finished))) {
            return res.status(403).json({
                successful: false,
                message: 'Not owner or captain'
            });
        }
        const bracketNode = tournament.finishMatch(req.body.matchNum, req.body.firstTeamWin, req.body.matchId);
        //сопоставляем команды на сайте и в игре
        match.tournamentId = req.body.tournamentId;
        if (match.radiant_win) {
            if (req.body.firstTeamWin) {
                match.radiant_team = bracketNode.team1;
                match.dire_team = bracketNode.team2;
            } else {
                match.radiant_team = bracketNode.team2;
                match.dire_team = bracketNode.team1;
            }
        } else {
            if (req.body.firstTeamWin) {
                match.radiant_team = bracketNode.team2;
                match.dire_team = bracketNode.team1;
            } else {
                match.radiant_team = bracketNode.team1;
                match.dire_team = bracketNode.team2;
            }
        }
        match.$session(session);
        const result = await match.save();
        await tournament.save();
        await session.commitTransaction();
        session.endSession();
        parseReplay(req.body.matchId);
        res.status(200).json({
            status: "ok",
            message: "post /matches",
            updatedTournament: tournament
        });
    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        if (err.kind === 'ObjectId') {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        } else
            res.status(500).json({
                status: "error",
                error: err
            });
    }
};


exports.match_get_all = async (req, res, next) => {
    try {
        let limit = +req.query.limit || 0;
        const matches = await Match.find()
            .select('_id start_time lobby_time players.player_slot players.account_id players.hero_id')
            .limit(limit)
            .exec();

        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].players.length; j++) {
                matches[i].players[j].hero_name = heroNames[matches[i].players[j].hero_id].name;
            }
        }

        const response = {
            status: "ok",
            counts: matches.length,
            matches: matches
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }

};

exports.match_get_one = async (req, res, next) => {
    try {

        let match = req.query.parsed ? await ParsedMatch.findOne({_id: req.params.matchId}).exec() :
            await Match.findOne({_id: req.params.matchId})
                .populate('dire_team')
                .populate('radiant_team')
                .populate('players.item_0')
                .populate('players.item_1')
                .populate('players.item_2')
                .populate('players.item_3')
                .populate('players.item_4')
                .populate('players.item_5')
                .populate('players.backpack_0')
                .populate('players.backpack_1')
                .populate('players.backpack_2');

        const response = {
            status: "ok",
            match: match
        };
        if (match) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                successful: false,
                message: 'Not found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err})
    }
};

exports.match_delete_one = async (req, res, next) => {
    try {
        await Match.deleteOne({_id: req.body.matchId}).exec();
        const response = {
            status: "ok",
            message: "deleted"
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({error: err})
    }
};

exports.match_parse = async (req, res, next) => {
    try {
        parseReplay(req.params.matchId);
        const resp = await axios.get(steamApi.getMatchDetails, {
            params: {
                match_id: req.params.matchId,
                key: process.env.STEAM_API_KEY
            }
        });
        resp.data.result._id = resp.data.result.match_id;
        for (let i = 0; i < resp.data.result.players.length; i++) {
            resp.data.result.players[i].hero_name = heroNames[resp.data.result.players[i].hero_id].name;
            resp.data.result.players[i].ability_upgrades.forEach((ability) => {
                ability.name = abilities[ability.ability];
            });
        }

        const match = new Match(resp.data.result);
        await match.save();
        res.status(200).json({
            status: "ok",
            message: "post /matches"
        });
        console.log(1);
    } catch (e) {
        console.log(e);
    }
};
