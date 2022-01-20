import React from 'react';
import './Home.css';

const Home = ({ user, setUser }) => {
	const handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		const copy = Object.assign({}, user);
		copy[name] = value;
		setUser(copy);
	};


	return (
		<div className='home-container'>
			<div className='home-header'>
				<span className='spot-header'>Spot</span>
				<span className='less-header'>Less</span>
			</div>
			<form className='home-form-container' >
				<input
					className='username-input'
					onChange={handleChange}
					type='text'
					name='username'
					// value={user.username}
					placeholder='Username'></input>
				<input
					className='password-input'
					onChange={handleChange}
					type='password'
					name='password'
					// value={user.password}
					placeholder='Password'></input>
				<button className='login-btn' type='submit'>
					Login
				</button>
				<button className='sign-up-btn'>Sign Up</button>
			</form>
		</div>
	);
};

export default Home;
