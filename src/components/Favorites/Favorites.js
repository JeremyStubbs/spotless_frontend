import React, { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = (props) => {
	//Set state to empty array
	const [favorites, setFavorites] = useState([]);

	//Get "favorites" playlist from playlists database and set state to it
	async function showFavs() {
		const response = await fetch(
			'https://spotlessproject.herokuapp.com/playlists/favorites',
			{
				method: 'GET',
			}
		);
		const data = await response.json();
		setFavorites(data.playlists[0].songs);
	}

	//useeffect so that above function runs on mount
	useEffect(() => {
		showFavs();
	}, []);

	//create return elements
	const songsList = favorites.map((song, index) => (
		<div className='favorites-list'>
			<div key={song}>{song}</div>
		</div>
	));

	return (
		<div className='favorites-container'>
			<h4>Favorites</h4>
			{songsList}
		</div>
	);
};

export default Favorites;
