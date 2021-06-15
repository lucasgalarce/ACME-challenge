import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

const LicensesList = ({
	developerId,
	licenses,
	fetchDevelopers,
	userToken,
}) => {
	const removeLicenseToDeveloper = async (licenseId) => {
		await axios.delete(
			'http://localhost:3000/developers/deleteLicenseToDeveloper',
			{
				headers: {
					sessToken: userToken,
				},
				data: {
					developerId,
					licenseId,
				},
			}
		);

		fetchDevelopers();
	};
	return (
		<div style={{ width: '48%', float: 'left' }}>
			<h3 className="text-center">Licenses</h3>
			<ul className="assignmentsList">
				{licenses &&
					licenses.map((license) => (
						<li key={license.id}>
							<p className="software">
								{license.software}{' '}
								<Button
									variant="danger"
									size="sm"
									onClick={() => removeLicenseToDeveloper(license.id)}
								>
									X
								</Button>
							</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default LicensesList;
