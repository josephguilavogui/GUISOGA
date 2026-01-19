const router = require("express").Router();
const User = require("../models/User");

// 🔹 Liste utilisateurs
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 🔹 Profil utilisateur
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

// 🔹 Suivre / Se désabonner
router.put("/:id/follow", async (req, res) => {
  const currentUserId = req.body.userId;

  if (currentUserId === req.params.id) {
    return res.status(400).json("Impossible de se suivre soi-même");
  }

  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(currentUserId);

  if (!user.followers.includes(currentUserId)) {
    await user.updateOne({ $push: { followers: currentUserId } });
    await currentUser.updateOne({ $push: { following: req.params.id } });

    res.json("Abonnement réussi");
  } else {
    await user.updateOne({ $pull: { followers: currentUserId } });
    await currentUser.updateOne({ $pull: { following: req.params.id } });

    res.json("Désabonnement réussi");
  }
});

module.exports = router;
