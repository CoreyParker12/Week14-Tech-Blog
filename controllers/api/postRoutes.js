const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

    res.status(200).json(newPost);
    console.log(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', (req, res) => {
      const deletePost = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(deletePost);
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatePost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;