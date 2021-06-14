import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

import AssetsList from './AssetsList.js';
import LicensesList from './LicensesList.js';
import ModalAssets from './ModalAssets';
import ModalLicenses from './ModalLicenses';

const DeveloperList = () => {
	const [developers, setDevelopers] = useState({});

	const fetchDevelopers = async () => {
		const res = await axios.get(
			'http://localhost:3000/developers/fetchAllDevelopers',
			{
				headers: {
					sessToken:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE',
				},
			}
		);

		setDevelopers(res.data.fetchedDevelopers);
	};

	const axiosConfig = {
		headers: {
			sessToken:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE',
		},
	};

	const changeDeveloperStatus = async (developerId, status) => {
		const data = {
			id: developerId,
			status,
		};

		await axios.put(
			'http://localhost:3000/developers/changeStatus',
			data,
			axiosConfig
		);
		fetchDevelopers();
	};

	useEffect(() => {
		fetchDevelopers();
	}, []);

	const renderedDevelopers = Object.values(developers).map((developer) => {
		return (
			<div
				className="card"
				style={{ width: '100%', marginBottom: '20px' }}
				key={developer.id}
			>
				<div className="card-body">
					<div>
						<h3 className="devName text-center">
							{developer.fullname}{' '}
							<Button
								variant={developer.active ? 'danger' : 'success'}
								onClick={() =>
									changeDeveloperStatus(developer.id, !developer.active)
								}
							>
								{developer.active ? 'Disable' : 'Enable'}
							</Button>
						</h3>
					</div>
					<AssetsList
						assets={developer.assets}
						developerId={developer.id}
						fetchDevelopers={() => fetchDevelopers()}
					/>
					<LicensesList
						licenses={developer.licenses}
						developerId={developer.id}
						fetchDevelopers={() => fetchDevelopers()}
					/>
				</div>

				<ModalAssets
					developerId={developer.id}
					isActive={developer.active}
					fetchDevelopers={() => fetchDevelopers()}
				/>
				<ModalLicenses
					developerId={developer.id}
					isActive={developer.active}
					fetchDevelopers={() => fetchDevelopers()}
				/>
			</div>
		);
	});

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedDevelopers}
		</div>
	);
};

export default DeveloperList;
