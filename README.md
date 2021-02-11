# random-playlist-generator

This app allows you to create and save randomly generated playlists. These playlists are save directly to your spotify account.

<img src="./app-demo.gif" width="180" height="160" />

## R

## `.env`
Environmental variables assigned in `.env` file at root level of React app
``` bash
CLIENT_ID="" # string
CLIENT_SECRET="" # string
# Redirect uri set in Spotify app
REDIRECT_URI="http://localhost:8080/callback"
PORT=8080 # int
```
## Running the App
App requires two terminal sessions, one at root and the other at `/client`.