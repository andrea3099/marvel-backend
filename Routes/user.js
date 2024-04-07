const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const uid2 = require("uid2"); // Sert à créer des string aléatoires
const SHA256 = require("crypto-js/sha256"); // Sert à hasher
const encBase64 = require("crypto-js/enc-base64"); // Sert à transformer l'encryptage en string
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route permetant de créer un user

router.post("/user/signup", async (req, res) => {
  try {
    console.log(req.body);

    const saltUser = uid2(32);
    const tokenUser = uid2(64);
    const hashUser = SHA256(req.body.password + saltUser).toString(encBase64);
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist !== null) {
      return res.status(400).json("Email not available");
    }
    if (req.body.username === "") {
      return res.status(400).json("Missing username");
    }
    if (req.body.password === "") {
      return res.status(400).json("Missing password");
    }
    const newUser = new User({
      email: req.body.email,
      account: {
        username: req.body.username,
      },
      token: tokenUser,
      hash: hashUser,
      salt: saltUser,
    });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
      account: {
        username: newUser.account.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/user/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) {
      return res.status(401).json("Email or password incorect");
    }
    const hashUser = SHA256(req.body.password + userLogin.salt).toString(
      encBase64
    );
    if (hashUser === userLogin.hash) {
      res.status(200).json({
        _id: userLogin._id,
        token: userLogin.token,
        account: { username: userLogin.account.username },
      });
    } else {
      res.status(401).json("Email ou password incorect");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/user/favorites/comics/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { token: req.user.token },
      {
        $push: {
          favComics: [
            {
              comics_id: req.body.id,
              comics_title: req.body.comics_title,
              comics_description: req.body.comics_description,
              comics_picture: req.body.comics_picture,
            },
          ],
        },
      },
      { new: true }
    );
    // console.log(existingFavComics.favComics);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/user/favorites/characters/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { token: req.user.token },
      {
        $push: {
          favCharacters: [
            {
              characters_id: req.body.id,
              characters_name: req.body.characters_name,
              characters_description: req.body.characters_description,
              characters_picture: req.body.characters_picture,
            },
          ],
        },
      },
      { new: true }
    );
    // console.log(existingFavComics.favComics);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/favorites", isAuthenticated, async (req, res) => {
  try {
    const userFound = req.user;
    // console.log(userFound);
    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
