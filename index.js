require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const axios = require("axios");

// Route pour acceder a tout les comics
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});

// Route pour acceder au comics d'un personnage ayant pour id celui contenu dans les params
app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});

// Route pour acceder au comics ayant pour id celui contenu dans les params
app.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});
// Route pour acceder a tout les personnages
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});

// Route pour acceder au personnage ayant pour id celui contenu dans les params
app.get("/character/:characterId", async (req, res) => {
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

// Route pour tout les routes n'existant pas
app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started 🔥🔥🔥");
});
