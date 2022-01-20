import React, { useEffect } from 'react';

const Profile = (props) => {
	useEffect(() => {
		fetch('https://spotlessproject.herokuapp.com/users')
			.then((response) => response.json())
			.then((data) => props.setUser(data.users));
	});

	const userDetails =
		props.user &&
		props.user.map((user) => {
			return (
				<div key={user._id}>
					{/* <div>{user.picture}</div> */}
					<div>Username: {user.username}</div>
					{/* <div>Favorites: {user.favorites}</div> */}
				</div>
			);
		});

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
			{userDetails[0]}
			Favorites: {favoritesList}
		</div>
	);
};

export default Profile;
