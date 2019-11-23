const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const querystring = require("querystring");
const db = require("./models");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const SpotifyNodeApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyNodeApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const app = express();

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  const data = await spotifyApi.authorizationCodeGrant(code);
  const { expires_in, access_token, refresh_token } = data.body;
  res.redirect(
    "http://localhost:3000/#" +
      querystring.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      })
  );
});

// this lets us parse 'application/json' content in http requests
app.use(bodyParser.json());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use("/api", require("./controllers"));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });

// start up the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
