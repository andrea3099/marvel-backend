const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route pour acceder a tout les personnages
router.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    const name = req.query.name || "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});

// Route pour acceder au personnage ayant pour id celui contenu dans les params
router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=jSt0lUsIjCzTzSh2`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});
module.exports = router;
