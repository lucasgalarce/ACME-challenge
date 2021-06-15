import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './App.css';

const AssetsList = ({ developerId, assets, fetchDevelopers, userToken }) => {
	const removeAssetToDeveloper = async (assetId) => {
		await axios.delete(
			'http://localhost:3000/developers/deleteAssetToDeveloper',
			{
				headers: {
					sessToken: userToken,
				},
				data: {
					developerId,
					assetId,
				},
			}
		);
		fetchDevelopers();
	};
	return (
		<div style={{ width: '48%', float: 'left' }}>
			<h3 className="text-center">Assets</h3>
			<ul className="assignmentsList">
				{assets &&
					assets.map((asset) => (
						<li key={asset.id}>
							<p className="model">
								{asset.model}{' '}
								<Button
									variant="danger"
									size="sm"
									onClick={() => removeAssetToDeveloper(asset.id)}
								>
									X
								</Button>
							</p>
							<p>Brand: {asset.brand}</p>
							<p>Type: {asset.type}</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default AssetsList;
