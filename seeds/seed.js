
const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');
const userSeed = require('./userSeed.json');
const commentSeed = require('./commentSeed.json');
const postSeed = require('./postSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const createUsers = await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const createPosts of postSeed) {
    await Post.create({
      ...createPosts,
      user_id: createUsers[Math.floor(Math.random() * createUsers.length)].id,
    });
  }

  const createPosts = await Post.findAll();

  for (const createComments of commentSeed) {
    await Comment.create({
      ...createComments,
      user_id: createUsers[Math.floor(Math.random() * createUsers.length)].id,
      post_id: createPosts[Math.floor(Math.random() * createPosts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
