import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
	const [fullname, setFullName] = useState('');

	const axiosConfig = {
		headers: {
			sessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE',
		},
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		const data = {
			fullname,
		};

		await axios.post(
			'http://localhost:3000/developers/createDeveloper',
			data,
			axiosConfig
		);

		setFullName('');
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
