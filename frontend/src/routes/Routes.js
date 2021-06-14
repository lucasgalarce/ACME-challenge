import React, { useState, useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import Login from '../pages/Login';
import Menu from '../pages/Menu.js';

const App = () => {
	const [userToken, setUserToken] = useState(null);

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('sessToken');
		if (loggedUserJSON) {
			const userToken = JSON.parse(loggedUserJSON);
			setUserToken(userToken);
		}
	}, []);
	return (
		<Router>
			{userToken === null && <Redirect from="/menu" to="/" noThrow />}
			{userToken !== null && <Redirect from="/" to="/menu" noThrow />}
			<Login path="/" setUserToken={setUserToken} />
			<Menu path="/menu" />
		</Router>
	);
};

export default App;
