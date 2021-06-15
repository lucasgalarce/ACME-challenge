import React, { useState } from 'react';
import axios from 'axios';
import DeveloperList from '../DeveloperList';
import DeveloperCreate from '../DeveloperCreate';
const Menu = ({ userToken }) => {
	const [developers, setDevelopers] = useState({});

	const { REACT_APP_API_URL } = process.env;

	const fetchDevelopers = async () => {
		const res = await axios.get(
			`${REACT_APP_API_URL}/developers/fetchAllDevelopers`,
			{
				headers: {
					sessToken: userToken,
				},
			}
		);

		setDevelopers(res.data.fetchedDevelopers);
	};

	return (
		<div className="container">
			<h1>Create Developer</h1>
			<DeveloperCreate
				userToken={userToken}
				fetchDevelopers={fetchDevelopers}
			/>
			<hr />
			<h1>Developers</h1>
			<DeveloperList
				userToken={userToken}
				developers={developers}
				fetchDevelopers={fetchDevelopers}
			/>
		</div>
	);
};

export default Menu;
