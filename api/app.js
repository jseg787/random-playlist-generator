const express = require('express');
const querystring = require('querystring');
const dotenv = require('dotenv');
const SpotifyNodeApi = require('spotify-web-api-node');
dotenv.config();

const PORT = 8000;

const spotifyApi = new SpotifyNodeApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI
});

const scopes = [
	'user-read-email',
	'user-read-private',
	'playlist-modify-public',
	'playlist-modify-private',
	'user-library-modify'
];

function generateRandomString(length) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const app = express();

app.get('/login', (req, res) => {
	const state = generateRandomString(16);
	res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

app.get('/callback', async (req, res) => {
	const { code, state } = req.query;
	const data = await spotifyApi.authorizationCodeGrant(code);
	const { expires_in, access_token, refresh_token } = data.body;
	res.redirect(
		'http://localhost:3000/#' +
			querystring.stringify({
				access_token: access_token,
				refresh_token: refresh_token
			})
	);
});

// start up the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
