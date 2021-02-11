import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

export const setAccessToken = (access_token) => {
	spotifyWebApi.setAccessToken(access_token);
};

/**
 * Gets the hashparams if they exist
 * @returns hash params (access_token in this case)
 */

export const getHashParams = () => {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};

/**
 * Gets spotify account information about the user
 * @returns {Object} The user's spotify information
 */

export const getMe = async () => {
	const me = await spotifyWebApi.getMe();
	return me;
};

/**
 * Gets a list of genres
 * @returns {Array} genres
 */

export const getGenres = async () => {
	const genreData = await spotifyWebApi.getAvailableGenreSeeds();
	return genreData.genres;
};

/**
 * Gets a string representing the date
 * @returns {string} date formatted "yyyy-mm-dd hh:mm"
 */

export const getDateString = () => {
	const date = new Date();
	const day = date.getDay().toString();
	const month = date.getMonth().toString();
	const year = date.getFullYear().toString();
	const hour = date.getHours().toString();
	const minutes = date.getMinutes().toString();
	const title = `${year}-${month}-${day} ${hour}:${minutes}`;
	return title;
};
