const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateToken')
const admin = require('../middleware/admin')
const { getAllUsers, getUser, createUser, updateUser, deleteUser, createGame, updateGame, deleteGame, getGame, getGames, getPost, getPosts, deletePost, getComment, getComments, deleteComment } = require('../controller/admin')

router.use(validateToken)
router.use(admin)

router.post('/user/create', createUser)   //@desc For admins to create an user.
router.put('/user/update/:id', updateUser)   //@desc For admins to update an user.
router.delete('/user/delete/:id', deleteUser)   //@desc For admins to delete an user.
router.get('/user/get/:id', getUser)   //@desc For admins to get an user.
router.get('/user/get', getAllUsers)   //@desc For admins to get all users.

router.get('/post/get/:id', getPost)   //@desc For admins to get a post.
router.get('/post/get', getPosts)   //@desc For admins to get all posts.
router.delete('/post/delete/:id', deletePost)   //@desc For admins to delete a post.

router.get('/comment/get/:id', getComment)   //@desc For admins to get a comment.
router.get('/comment/get', getComments)   //@desc For admins to get all comments.
router.delete('/comment/delete/:id', deleteComment)   //@desc For admins to delete a comment.

router.post('/game/create', createGame)   //@desc For admins to create a game.
router.put('/game/update/:id', updateGame)   //@desc For admins to update a game.
router.delete('/game/delete/:id', deleteGame)   //@desc For admins to delete a game.
router.get('/game/get/:id', getGame)   //@desc For admins to get a game.
router.get('/game/get', getGames)   //@desc For admins to get all games.

module.exports = router