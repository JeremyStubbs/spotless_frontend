import React, { useEffect, useState } from 'react';
import './Generator.css';

const Generator = ({ songs, setSongs }) => {
	//Set states
	//This is set by box select in form
	const [genre, setGenre] = useState([]);

	//Make playlist (object) in parts: name (string) and songs (array) separately
	const [playlistName, setPlaylistName] = useState('');
	const [playlistSongs, setPlaylistSongs] = useState([]);
	const [playlist, setPlaylist] = useState({ name: '', songs: [] });

	//set favorite to empty array
	const [favoriteSongs, setFavoriteSongs] = useState([]);

	//Set genre to box you selected
	const handleChange = (event) => {
		setGenre(event.target.value);
	};

	//Make api call to songs collection for all that match that genre, then set songs to songs returned
	async function handleClick(e) {
		e.preventDefault();
		setSongs([]);
		const response = await fetch(`http://localhost:4000/songs/${genre}`, {
			method: 'GET',
		});
		const data = await response.json();
		setSongs(data.songs);
	}

	//Set playlist name to what you typed
	const handleChange2 = (event) => {
		setPlaylistName(event.target.value);
	};

	//Set playlists songs to ones you clicked
	const addToPlaylist = (song) => {
		setPlaylistSongs([...playlistSongs, song]);
	};

	//Splice out selected song from forming playlist
	const removeFromPlaylist = (indexToRemove) => {
		let newList = [...playlistSongs];
		newList.splice(indexToRemove, 1);
		setPlaylistSongs(newList);
	};

	//Combine name and songs to make playlist
	const setting = () => {
		setPlaylist({ name: playlistName, songs: playlistSongs });
	};

	//change playlist anytime name or songs change
	useEffect(() => {
		setting();
	}, [playlistSongs, playlistName]);

	//Post playlist
	async function handleClick2(e) {
		const response = await fetch('http://localhost:4000/playlists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(playlist),
		});
	}

	//Create return elements
	//Create list of songs you pulled from database
	const songList = songs.map((song) => (
		<li className='song-list' key={song.title}>
			{song.title} - {song.artist} -{' '}
			<a href={song.trackLink} target='_blank' rel='noreferrer'>
				Listen
			</a>{' '}
			-{' '}
			<button className='song-btns' onClick={() => addToPlaylist(song.title)}>
				Add
			</button>{' '}
			<button
				className='song-btns'
				onClick={() => addToFavoriteSongs(song.title)}>
				Fav
			</button>
		</li>
	));

	//Create return element of songs you want to add to database
	const playlistList = playlistSongs.map((song, index) => (
		<div>
			<li key={song}>{song}</li>
			<button className='song-btns' onClick={() => removeFromPlaylist(index)}>
				{' '}
				Remove
			</button>
		</div>
	));

	//Every time you click add to favs you set the above state to that song
	const addToFavoriteSongs = (fav) => {
		setFavoriteSongs([fav]);
	};

	//when state changes run PUT api call on favs playlist
	useEffect(() => {
		postFavs();
	}, [favoriteSongs]);

	//PUT: update favorites to include new song
	async function postFavs() {
		const response = await fetch('http://localhost:4000/playlists/favorites', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(favoriteSongs),
		});
	}

	return (
		<div className='generator-container'>
			<form className='new-playlist-form' onSubmit={handleClick2}>
				<input
					className='new-playlist-input'
					onChange={handleChange2}
					type='text'
					name='artistName'
					placeholder='Playlist Name'
					value={playlistName}
				/>
				<button type='submit' className='save-playlist-btn'>
					Save to Playlists
				</button>
			</form>
			<form
				className='checkbox-form-container'
				onSubmit={handleClick}
				onChange={handleChange}>
				<div className='checkbox-container'>
					<input type='radio' id='rock' name='genre' value='rock' />
					<label for='rock'>Rock</label>
					<input type='radio' id='jazz' name='genre' value='jazz' />
					<label for='jazz'>Jazz</label>
					<input type='radio' id='rap' name='genre' value='rap' />
					<label for='rap'>Rap</label>
					<input
						type='radio'
						id='alternative'
						name='genre'
						value='alternative'
					/>
					<label for='alternative'>Alternative</label>
					<br />
					<input type='radio' id='blues' name='genre' value='blues' />
					<label for='blues'>Blues</label>
					<input type='radio' id='electronic' name='genre' value='electronic' />
					<label for='electronic'>Electronic</label>
					<input type='radio' id='funk' name='genre' value='funk' />
					<label for='funk'>Funk</label>
					<input type='radio' id='hip hop' name='genre' value='hip hop' />
					<label for='hip hop'>Hip Hop</label>
					<br />
					<input type='radio' id='metal' name='genre' value='metal' />
					<label for='metal'>Metal</label>
					<input type='radio' id='pop' name='genre' value='pop' />
					<label for='pop'>Pop</label>
					<input type='radio' id='punk' name='genre' value='punk' />
					<label for='punk'>Punk</label>
					<input type='radio' id='r&b' name='genre' value='r&b' />
					<label for='r&b'>R&B</label>
				</div>
				<button className='generator-btn' type='submit'>
					Generate Playlist
				</button>
			</form>
			<div className='generated-playlist-container'>
				<ul className='generated-playlist'>{songList}</ul>
			</div>
			<ul className='add-to-playlist-list'>{playlistList}</ul>
		</div>
	);
};

export default Generator;
