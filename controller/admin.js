const bcryptjs = require('bcryptjs')
const User = require('../model/user')
const Post = require('../model/post')
const Game = require('../model/game')
const Comment = require('../model/comment')

//@desc GET ALL USERS
//@route GET /api/admin/user/get
//@access ADMIN
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

//@desc GET THE USER
//@route GET /api/admin/user/get/:id
//@access ADMIN
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//@desc CREATE A USER
//@route POST /api/admin/user/create
//@access ADMIN
const createUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body
        if (!username || !email || !password || !role) {
            const error = new Error('Provide all values.')
            error.statusCode = 400
            throw error
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        await User.create({ username, email, password: hashedPassword, role })
        res.status(201).json({ created: true })
    } catch (error) {
        next(error)
    }
}

//@desc UPDATE A USER
//@route PUT /api/admin/user/update/:id
//@access ADMIN
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const { username, email, password, role } = req.body
        if (!username || !email || !password || !role) {
            const error = new Error('Provide all values.')
            error.statusCode = 400
            throw error
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        await User.findByIdAndUpdate(id, { username, email, password: hashedPassword, role })
        res.status(201).json({ updated: true })
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A USER
//@route DELETE /api/admin/user/delete/:id
//@access ADMIN
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(200).json({ deleted: true })
    } catch (error) {
        next(error)
    }
}

//@desc GET A POST
//@route GET /api/admin/post/get/:id
//@access ADMIN
const getPost = async (req, res, next) => {
    try {
        const postID = req.params.id
        const post = await Post.findById(postID)
            .populate('author', '-password')
            .populate({
                path: 'game',
                populate: {
                    path: 'producer',
                    model: 'User',
                    select: '-password'
                }
            })
            .populate('likes', '-password')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: '-password'
                }
            })
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL POSTS
//@route GET /api/admin/post/get
//@access ADMIN
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', '-password')
            .populate({
                path: 'game',
                populate: {
                    path: 'producer',
                    model: 'User',
                    select: '-password'
                }
            })
            .populate('likes', '-password')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: '-password'
                }
            })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A POST
//@route DELETE /api/admin/post/delete/:id
//@access ADMIN
const deletePost = async (req, res, next) => {
    try {
        const postID = req.params.id
        await Post.findByIdAndDelete(postID)
        res.status(202).json({ deleted: true })
    } catch (error) {
        next(error)
    }
}

//@desc GET A COMMENT
//@route GET /api/admin/comment/get/:id
//@access ADMIN
const getComment = async (req, res, next) => {
    try {
        const commentID = req.params.id
        const comment = await Comment.findById(commentID)
            .populate('author', '-password')
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL COMMENTS
//@route GET /api/admin/comment/get
//@access ADMIN
const getComments = async (req, res, next) => {
    try {
        const comment = await Comment.find()
            .populate('author', '-password')
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A COMMENT
//@route DELETE /api/admin/comment/delete/:id
//@access ADMIN
const deleteComment = async (req, res, next) => {
    try {
        const commentID = req.params.id
        await Comment.findByIdAndDelete(commentID)
        res.status(202).json({ deleted: true })
    } catch (error) {
        next(error)
    }
}

//@desc CREATE A GAME
//@route POST /api/admin/game/create
//@access ADMIN
const createGame = async (req, res, next) => {
    try {
        const { name, releaseYear, producerID } = req.body
        if (name && releaseYear && producerID) {
            await Game.create({ name, release_year: releaseYear, producer: producerID })
            res.status(201).json({ created: true })
        }
        else if (name && releaseYear) {
            await Game.create({ name, release_year: releaseYear })
            res.status(201).json({ created: true })
        } else {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        next(error)
    }
}

//@desc UPDATE A GAME
//@route PUT /api/admin/game/update/:id
//@access ADMIN
const updateGame = async (req, res, next) => {
    try {
        const gameID = req.params.id
        const { name, releaseYear, producerID } = req.body
        if (name && releaseYear && producerID) {
            await Game.findByIdAndUpdate(gameID, { name, release_year: releaseYear, producer: producerID })
            res.status(201).json({ updated: true })
        }
        else if (name && releaseYear) {
            await Game.findByIdAndUpdate(gameID, { name, release_year: releaseYear })
            res.status(201).json({ updated: true })
        } else {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A GAME
//@route DELETE /api/admin/game/delete/:id
//@access ADMIN
const deleteGame = async (req, res, next) => {
    try {
        const gameID = req.params.id
        await Game.findByIdAndDelete(gameID)
        res.status(202).json({ deleted: true })
    } catch (error) {
        next(error)
    }
}

//@desc GET A GAME
//@route GET /api/admin/game/get/:id
//@access ADMIN
const getGame = async (req, res, next) => {
    try {
        const gameID = req.params.id
        const game = await Game.findById(gameID)
            .populate('producer', '-password')
        res.status(200).json(game)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL GAMES
//@route GET /api/admin/game/get
//@access ADMIN
const getGames = async (req, res, next) => {
    try {
        const games = await Game.find()
            .populate('producer', '-password')
        res.status(200).json(games)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getPost,
    getPosts,
    getComment,
    getComments,
    deleteComment,
    deletePost,
    createGame,
    updateGame,
    deleteGame,
    getGame,
    getGames
}