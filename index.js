require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

//import des routes
const comicsRoute = require("./Routes/comics");
const charactersRoute = require("./Routes/characters");
const userRouter = require("./Routes/user");
app.use(comicsRoute);
app.use(charactersRoute);
app.use(userRouter);

// Route pour tout les routes n'existant pas
app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started 🔥🔥🔥");
});
