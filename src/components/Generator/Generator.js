import React, { useEffect, useState } from 'react';
import './Generator.css';

const Generator = ({ songs, setSongs,  }) => {
	//Set states
	//This is set by box select in form
	const [genre, setGenre] = useState([]);
	const [playlistName, setPlaylistName] = useState('');
	const [playlistSongs, setPlaylistSongs] = useState([]);

	const url_songs = ''
	const url_playlists = ''
	

	//Set genre to box you selected
	const genreFunction = (event) => {
		setGenre(event.target.value);
	};

	//Make api call to songs collection for all that match that genre, then set songs to songs returned
	async function getSongs(e) {
		e.preventDefault();
		setSongs([]);
		const response = await fetch(`${url_songs}/items/genre/${genre}`, {
			method: 'GET',
		});
		const data = await response.json();
		setSongs(data.Items);
	}

	//Set playlist name to what you typed
	const playlistNameFunction = (event) => {
		setPlaylistName(event.target.value);
	};

	//Set playlists songs to ones you clicked
	const updatePlaylist = (song) => {
		setPlaylistSongs([...playlistSongs, song]);
	};

	//Splice out selected song from forming playlist
	const removeFromPlaylist = (indexToRemove) => {
		let newList = [...playlistSongs];
		newList.splice(indexToRemove, 1);
		setPlaylistSongs(newList);
	};


	//Post playlist
	async function handleClick2(e) {
		e.preventDefault();
		let playlist = { name: playlistName, owner: "me", songs: playlistSongs }
		const response = await fetch(`${url_playlists}/items`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify(playlist),
		});
		const data = await response.json()
	}

	//Create return elements
	//Create list of songs you pulled from database
	const songList = songs.map((song) => (
		<li className='song-list' key={song.SongTitle}>
			{song.SongTitle} - {song.Artist} -{' '}
			<a href={song.trackLink} target='_blank' rel='noreferrer'>
				Listen
			</a>{' '}
			-{' '}
			<button className='song-btns' onClick={() => updatePlaylist(song.SongTitle)}>
				Add
			</button>{' '}
			<button
				className='song-btns'
				onClick={() => addToFavoriteSongs(song.SongTitle)}>
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

	
	//Every time you click add to favs you set the above state to current playlist + that song
	async function addToFavoriteSongs(fav) {
		const response = await fetch(`${url_playlists}/items?name=favs&owner=me`,{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		})
		const data = await response.json()
		let playlist = {"name":"favs", "owner":"me","songs":[...data.Item.songs]};
		if (playlist.songs.includes(fav) == false){
			playlist = {name:'favs', owner: 'me', songs: [...data.Item.songs,fav]};
		}
		const response2 = await fetch(`${url_playlists}/items`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(playlist),
		});
		const data2 = await response2.json()
	}



	return (
		<div className='generator-container'>
			<form className='new-playlist-form' onSubmit={handleClick2}>
				<input
					className='new-playlist-input'
					onChange={playlistNameFunction}
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
				onSubmit={getSongs}
				onChange={genreFunction}>
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
