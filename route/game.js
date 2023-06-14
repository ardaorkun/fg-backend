const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateToken')
const { getGame, getGames } = require('../controller/game')

router.use(validateToken)

router.get('/get/:id', getGame)   //@desc For users to get a game.
router.get('/get', getGames)   //@desc For users to get all games.

module.exports = router