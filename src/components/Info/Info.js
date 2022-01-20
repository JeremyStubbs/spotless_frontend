import React from 'react';
import './Info.css';

const Info = () => {
	return (
		<div className='info-container'>
			<h1 className='info-header'>Info</h1>
			<p className='info-paragraph'>
				A new music app called, "SpotLess". This revolutionary music app will
				allow users to create randomized music playlists from the Spotify API.
				Users will be able to generate randomized playlists using specific track
				details such as: genre, decade, tempo, etc. Users will also be able to
				favorite these randomly selected tracks to store into their own
				favorites playlist.
			</p>
		</div>
	);
};

export default Info;