const Game = require('../model/game')

//@desc GET A GAME
//@route GET /api/game/get/:id
//@access PRIVATE
const getGame = async (req, res, next) => {
    try {
        const gameID = req.params.id
        const game = await Game.findById(gameID)
            .select('_id name release_year')
            .populate('producer', "_id username")
        res.status(200).json(game)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL GAMES
//@route GET /api/game/get
//@access PRIVATE
const getGames = async (req, res, next) => {
    try {
        const games = await Game.find()
            .select('_id name release_year')
            .populate('producer', "_id username")
        res.status(200).json(games)
    } catch (error) {
        next(error)
    }
}

module.exports = { getGame, getGames }