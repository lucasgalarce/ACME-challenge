import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();

		const data = {
			email,
			password,
		};
		console.log(email, password);

		const res = await axios.post("http://localhost:3000/users/login", data);

		console.log(res);
	};

	return (
		<div className="container ">
			<div className="row justify-content-center ">
				<div className="col-6">
					<Form onSubmit={onSubmit}>
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
