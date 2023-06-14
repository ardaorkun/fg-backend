const Post = require('../model/post')
const Comment = require('../model/comment')

//@desc CREATE A POST
//@route POST /api/post/create
//@access PRIVATE
const createPost = async (req, res, next) => {
    try {
        const userID = req.user.id
        const { title, content, gameID } = req.body
        if (!userID || !title || !content) {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
        if (gameID) {
            await Post.create({ author: userID, title, content, game: gameID })
            res.status(201).json({ created: true })
        } else {
            await Post.create({ author: userID, title, content })
            res.status(201).json({ created: true })
        }
    } catch (error) {
        next(error)
    }
}

//@desc UPDATE A POST
//@route PUT /api/post/update/:id
//@access PRIVATE
const updatePost = async (req, res, next) => {
    try {
        const userID = req.user.id
        const postID = req.params.id
        const { title, content, gameID } = req.body
        if (!postID || !title || !content) {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
        const post = await Post.findById(postID)
        if (post && userID == post.author) {
            if (gameID) {
                await Post.findByIdAndUpdate(postID, { title, content, game: gameID })
                res.status(201).json({ updated: true })
            } else {
                await Post.findByIdAndUpdate(postID, { title, content })
                res.status(201).json({ updated: true })
            }
        } else {
            res.status(401).json({ updated: false, message: 'Post not found. Or the user is not authorized.'})
        }
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A POST
//@route DELETE /api/post/delete/:id
//@access PRIVATE
const deletePost = async (req, res, next) => {
    try {
        const userID = req.user.id
        const postID = req.params.id
        const post = await Post.findById(postID)
        if (post && userID == post.author) {
            await Post.findByIdAndDelete(postID)
            res.status(202).json({ deleted: true })
        } else {
            res.status(401).json({ deleted: false, message: 'Post not found. Or the user is not authorized.' })
        }
    } catch (error) {
        next(error)
    }
}

//@desc GET A POST
//@route GET /api/post/get/:id
//@access PRIVATE
const getPost = async (req, res, next) => {
    try {
        const postID = req.params.id
        const post = await Post.findById(postID)
            .select('-__v')
            .populate('author', 'username')
            .populate('game', "id name release_year")
            .populate('likes', 'username -_id')
            .populate({
                path: 'comments',
                select: '_id content',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: '_id username'
                }
            })
        if (!post) {
            res.status(404).json({ message: 'Post not found.'})
        }
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL POSTS (SORTED BY THE CREATION DATE)
//@route GET /api/post/get/latest
//@access PRIVATE
const getLatestPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .select('-__v')
            .populate('author', 'username')
            .populate('game', "id name release_year")
            .populate('likes', 'username -_id')
            .populate({
                path: 'comments',
                select: '_id content',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: '_id username'
                }
            })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

//@desc GET ALL POSTS (SORTED BY THE AMOUNT OF LIKES)
//@route GET /api/post/get/popular
//@access PRIVATE
const getPopularPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .sort({ likes: -1 })
            .select('-__v')
            .populate('author', 'username')
            .populate('game', "id name release_year")
            .populate('likes', 'username -_id')
            .populate({
                path: 'comments',
                select: '_id content',
                populate: {
                    path: 'author',
                    model: 'User',
                    select: '_id username'
                }
            })
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

//@desc LIKE A POST
//@route PUT /api/post/like
//@access PRIVATE
const likePost = async (req, res, next) => {
    try {
        const userID = req.user.id
        const postID = req.params.id
        if (await Post.findById(postID)) {
            await Post.findByIdAndUpdate(postID, { $addToSet: { likes: userID } })
            res.status(201).json({ message: 'Post liked successfully.'})
        } else {
            res.status(400).json({ message: 'Post not found.'})
        }
    } catch (error) {
        next(error)
    }
}

//@desc DISLIKE A POST
//@route PUT /api/post/dislike
//@access PRIVATE
const dislikePost = async (req, res, next) => {
    try {
        const userID = req.user.id
        const postID = req.params.id
        if (await Post.findById(postID)) {
            await Post.findByIdAndUpdate(postID, { $pull: { likes: userID } })
            res.status(201).json({ message: 'Post disliked successfully.'})
        } else {
            res.status(400).json({ message: 'Post not found.'})
        }
    } catch (error) {
        next(error)
    }
}

//@desc CREATE A COMMENT
//@route POST /api/post/comment/create
//@access PRIVATE
const createComment = async (req, res, next) => {
    try {
        const userID = req.user.id
        const { postID, content } = req.body
        if (!postID || !content) {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
        const comment = await Comment.create({ author: userID, postID, content })
        await Post.findByIdAndUpdate(postID, { $push: { comments: comment._id } })
        res.status(201).json({ created: true })
    } catch (error) {
        next(error)
    }
}

//@desc UPDATE A COMMENT
//@route PUT /api/post/comment/update/:id
//@access PRIVATE
const updateComment = async (req, res, next) => {
    try {
        const userID = req.user.id
        const commentID = req.params.id
        const { content } = req.body
        if (!content) {
            const error = new Error('Please provide all values.')
            error.statusCode = 400
            throw error
        }
        const comment = await Comment.findById(commentID)
        if (comment && userID == comment.author) {
            await Comment.findByIdAndUpdate(commentID, { content })
            res.status(201).json({ updated: true })
        } else {
            res.status(401).json({ updated: false, message: 'Comment not found. Or the user is not authorized.' })
        }
    } catch (error) {
        next(error)
    }
}

//@desc DELETE A COMMENT
//@route DELETE /api/post/comment/delete/:id
//@access PRIVATE
const deleteComment = async (req, res, next) => {
    try {
        const userID = req.user.id
        const commentID = req.params.id
        const comment = await Comment.findById(commentID)
        if (comment && userID == comment.author) {
            await Comment.findByIdAndDelete(commentID)
            res.status(202).json({ deleted: true })
        } else {
            res.status(401).json({ deleted: false, message: 'Comment not found. Or the user is not authorized.' })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPost,
    likePost,
    dislikePost,
    getPost,
    updatePost,
    deletePost,
    getLatestPosts,
    getPopularPosts,
    createComment,
    updateComment,
    deleteComment
}