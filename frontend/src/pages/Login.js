import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Alert } from 'react-bootstrap';

const Login = ({ setUserToken }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { REACT_APP_API_URL } = process.env;

	const Login = async (event) => {
		event.preventDefault();

		const data = {
			email,
			password,
		};

		const res = await axios.post(`${REACT_APP_API_URL}/users/login`, data);

		if (res.data.Response) {
			localStorage.setItem('sessToken', JSON.stringify(res.data.sessionToken));
			setUserToken(JSON.stringify(res.data.sessionToken));
		} else {
			setErrorMessage(res.data.Message);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center ">
				<div className="col-6">
					<Form onSubmit={Login}>
						<Form.Group controlId="Email">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="Password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						{errorMessage && (
							<Alert key={errorMessage} variant="danger">
								{errorMessage}
							</Alert>
						)}

						<Button variant="primary" type="submit">
							Login
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;
