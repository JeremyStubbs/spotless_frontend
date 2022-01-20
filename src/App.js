import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Generator from './components/Generator/Generator';
import Favorites from './components/Favorites/Favorites';
import Playlist from './components/Playlist/Playlist';
import Info from './components/Info/Info';
import Team from './components/Team/Team';
import Legal from './components/Legal/Legal';

function App() {
	const [songs, setSongs] = useState([]);

	//add favs if doesn't exist with following 2 functions
	async function handleClick2(e) {
		const response = await fetch(
			'http://localhost:4000/playlists',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: 'favorites', songs: [] }),
			}
		);
	}

	async function showFavs() {
		const response = await fetch(
			'http://localhost:4000/playlists/favorites',
			{
				method: 'GET',
			}
		);
		const data = await response.json();
		let placeholder = data.playlists.filter(
			(item) => item.name === 'favorites'
		);
		if (placeholder.length === 0) {
			handleClick2();
		}
	}

	useEffect(() => {
		showFavs();
	}, []);

	return (
		<div className='app-container'>
			<nav>
				<Link className='nav-item' to='/'>
					Home
				</Link>
				<Link className='nav-item' to='/playlist'>
					Playlists
				</Link>
				<Link className='nav-item' to='/favorites'>
					Favorites
				</Link>
				<Link className='nav-item' to='/generator'>
					Generator
				</Link>
				<Link className='nav-item' to='/profile'>
					Profile
				</Link>
			</nav>
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='playlist' element={<Playlist />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route
						path='/generator'
						element={<Generator songs={songs} setSongs={setSongs} />}
					/>
					<Route path='/profile' />
					<Route path='/info' element={<Info />} />
					<Route path='/Team' element={<Team />} />
					<Route path='/legal' element={<Legal />} />
				</Routes>
			</main>
			<footer>
				<Link className='footer-item' to='/info'>
					Info
				</Link>
				<Link className='footer-item' to='/team'>
					Team
				</Link>
				<Link className='footer-item' to='/legal'>
					Legal
				</Link>
			</footer>
		</div>
	);
}

export default App;
