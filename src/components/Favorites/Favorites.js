import React, { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = () => {

	const url_songs = ''
	const url_playlists = ''
	//Set state to empty array
	const [favorites, setFavorites] = useState([]);

	//Get "favorites" playlist from playlists database and set state to it
	async function showFavs() {
		const response = await fetch(`${url_playlists}/items?name=favs&owner=me`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		})
		const data = await response.json()
		setFavorites(data.Item.songs);
	}

	//useeffect so that above function runs on mount
	useEffect(() => {
		console.log('showing favs from favorites component')
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
