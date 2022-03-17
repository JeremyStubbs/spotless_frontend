import React, { useEffect, useState } from 'react';
import './Playlist.css';
const Playlist = () => {
	//Make empty states for playlist and the playlist you'd like to edit
	const [playlist, setPlaylist] = useState([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState([]);

	const url_songs = ''
	const url_playlists = ''

	//Get playlists from database
	async function showPlaylists() {
		const response = await fetch(`${url_playlists}/all?name=me`, {
			method: 'GET',
		});
		const data = await response.json();
		var filtered = data.Items.filter(function (el) {
			return el.name != 'favs';
		});
		setPlaylist(filtered);
	}
	//Run above function on mount
	useEffect(() => {
		showPlaylists();
	}, []);

	//Set state to songs within playlist
	const showSelectedPlaylist = (item) => {
		setSelectedPlaylist(item.songs);
	};
	//Delete (item is playlist, item.name is param used in findOneAndDelete)
	async function deletePlaylist( item) {
		console.log(item)
		const response = await fetch(`${url_playlists}/items`,{
				method: 'DELETE',
				body: JSON.stringify({name: item.name, owner: "me"})
			}
		);
		const data = await response.json()
		console.log("response ", response, data)
		//Get all remaining playlists and set state to them
		const response2 = await fetch(`${url_playlists}/all?name=me`, {
			method: 'GET',
		});
		const data2 = await response2.json();
		var filtered = data2.Items.filter(function (el) {
			return el.name != 'favs';
		});
		setPlaylist(filtered);
	}
	//Create return elements
	//playlists
	const playlistList = playlist.map((playlist, index) => (
		<div className='single-playlist'>
			{playlist.name}{' '}
			<button
				className='single-playlist-btns'
				onClick={() => showSelectedPlaylist(playlist)}>
				Show Playlist
			</button>{' '}
			<button
				className='single-playlist-btns'
				onClick={() => deletePlaylist(playlist)}>
				Delete Playlist
			</button>
		</div>
	));
	//songs within selected playlist
	const songList = selectedPlaylist.map((item) => {
		return <div className='song-list-container'>{item}</div>;
	});
	return (
		<div className='playlists-container'>
			<h4 className='playlist-headers'>Playlists</h4>
			{playlistList}
			<h4 className='playlist-headers'>Playlist Songs</h4>
			{songList}
		</div>
	);
};
export default Playlist;
