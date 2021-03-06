import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = ({ userToken, fetchDevelopers }) => {
	const [fullname, setFullName] = useState('');

	const { REACT_APP_API_URL } = process.env;
	const axiosConfig = {
		headers: {
			sessToken: userToken,
		},
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		const data = {
			fullname,
		};

		await axios.post(
			`${REACT_APP_API_URL}/developers/createDeveloper`,
			data,
			axiosConfig
		);

		setFullName('');
		fetchDevelopers();
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Developer Full Name</label>
					<input
						value={fullname}
						onChange={(e) => setFullName(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default PostCreate;
