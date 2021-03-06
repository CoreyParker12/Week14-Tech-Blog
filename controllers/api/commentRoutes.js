const router = require('express').Router();
const { Comment } = require('../../models');

// Creates a new comment on an individual post

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

    res.status(200).json(newComment);
    console.log(newComment)
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;