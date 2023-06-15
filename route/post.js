const express = require('express')
const { createPost, likePost, dislikePost, getPost, updatePost, deletePost, getLatestPosts, getPopularPosts, createComment, updateComment, deleteComment, getPostsOf } = require('../controller/post')
const router = express.Router()
const validateToken = require('../middleware/validateToken')

router.use(validateToken)

router.post('/create', createPost)   //@desc For user to create a post.
router.put('/update/:id', updatePost)   //@desc For user to update his/her post.
router.delete('/delete/:id', deletePost)   //@desc For user to delete his/her post.

router.get('/get/latest', getLatestPosts)   //@desc For users to get latest posts.
router.get('/get/popular', getPopularPosts)   //@desc For users to get popular posts.
router.get('/get/:id', getPost)   //@desc For users to get a post.
router.get('/get/author/:id', getPostsOf)   //@desc Returns posts of a certain user.

router.put('/like/:id', likePost)   //@desc For users to like a post.
router.put('/dislike/:id', dislikePost)   //@desc For users to dislike a post.

router.post('/comment/create', createComment)   //@desc For user to create a comment.
router.put('/comment/update/:id', updateComment)   //@desc For user to update his/her comment.
router.delete('/comment/delete/:id', deleteComment)   //@desc For user to delete his/her comment.

module.exports = router