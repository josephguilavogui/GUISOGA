const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS (feed global)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FEED DES ABONNEMENTS
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(
      userPosts.concat(...friendPosts).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE / UNLIKE
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== req.body.userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// COMMENT
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      userId: req.body.userId,
      text: req.body.text,
    });

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
