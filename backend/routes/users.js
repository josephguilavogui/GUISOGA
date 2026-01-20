const router = require("express").Router();
const User = require("../models/User");

// 🔹 SUIVRE UN UTILISATEUR
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("Utilisateur suivi avec succès ✅");
      } else {
        res.status(403).json("Tu suis déjà cet utilisateur ❌");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Tu ne peux pas te suivre toi-même ❌");
  }
});

// 🔹 NE PLUS SUIVRE
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("Utilisateur retiré des abonnements ✅");
      } else {
        res.status(403).json("Tu ne suis pas cet utilisateur ❌");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Action impossible ❌");
  }
});

// 🔹 VOIR PROFIL UTILISATEUR
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
