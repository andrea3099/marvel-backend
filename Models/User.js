const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  account: {
    username: String,
    avatar: Object, // nous verrons plus tard comment uploader une image
  },
  token: String,
  hash: String,
  salt: String,
  favComics: [
    {
      comics_id: String,
      comics_title: String,
      comics_description: String,
      comics_picture: String,
    },
  ],
  favCharacters: [
    {
      characters_id: String,
      characters_name: String,
      characters_description: String,
      characters_picture: String,
    },
  ],
});
module.exports = User;
