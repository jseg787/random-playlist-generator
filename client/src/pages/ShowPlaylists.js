import React from 'react';
import Song from '../components/Song';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

class ShowSongsPage extends React.Component {
	render() {
		return (
			<Link to="/">
				<button>Go back</button>
			</Link>
		);
	}
}

export default ShowSongsPage;
