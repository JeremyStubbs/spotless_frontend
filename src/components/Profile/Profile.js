import React, { useEffect } from 'react';

const Profile = (props) => {
	const favoritesList = props.favorites.map((song, index) => (
		<div>
			<li key={song}>
				{/* <img src={song.picture} className='album-artwork' alt='artwork' /> */}
				{song.title} - {song.artist}{' '}
				<a href={song.trackLink} target='_blank' rel='noreferrer'>
					Preview
				</a>{' '}
				<button onClick={() => props.removeFavFromList(index)}>Remove</button>
			</li>
		</div>
	));

	return (
		<div>
			<h1>Profile</h1>
			Favorites: {favoritesList}
		</div>
	);
};

export default Profile;
