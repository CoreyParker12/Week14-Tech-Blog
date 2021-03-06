const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Find all posts and display on homepage

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((xxx) => xxx.get({ plain: true }));

    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find all posts by the logged in user

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    const posts = postData.map((xxx) => xxx.get({ plain: true }));
    const users = userData.get({ plain: true });

    res.render('dashboard', { 
      posts,
      ...users, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

// Find a single post that the user clicked on

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    const posts = postData.get({ plain: true });

    const comments = commentData.map((xxx) => xxx.get({ plain: true }));

    if (posts.user_id === req.session.user_id) {
      req.session.user_is_me = true;
    } else {
      req.session.user_is_me = false;
    };

    console.log(req.session);

    res.render('single-post', {
      ...posts, 
      comments,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_is_me: req.session.user_is_me,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Create a new post

router.get('/posts', withAuth, async (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  });
  return; 
});

// Update a post

router.get('/updatepost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const posts = postData.get ({ plain: true});

    res.render('update-post', {
      ...posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
  return; 
});

module.exports = router;
