import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const ModalAssets = ({ developerId, isActive, fetchDevelopers, userToken }) => {
	const [show, setShow] = useState(false);
	const [assets, setAssets] = useState({});
	const [currentAssetId, setCurrenAssetId] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleClose = () => {
		setShow(false);
		setErrorMessage(null);
	};
	const handleShow = () => setShow(true);

	const handleAssetIdToadd = (e) => {
		setCurrenAssetId(e.target.value);
	};

	const axiosConfig = {
		headers: {
			sessToken: userToken,
		},
	};

	const { REACT_APP_API_URL } = process.env;

	const addAssetToDeveloper = async () => {
		const data = {
			developerId,
			assetId: currentAssetId,
		};

		const res = await axios.post(
			`${REACT_APP_API_URL}/developers/addAssetToDeveloper`,
			data,
			axiosConfig
		);

		if (res.data.Response) {
			handleClose();
			setCurrenAssetId(assets[0].id);
			fetchDevelopers();
		} else {
			setErrorMessage(res.data.Message);
		}
	};

	const fetchAllAssets = async () => {
		const res = await axios.get(
			`${REACT_APP_API_URL}/assets/fetchAllAssets`,
			axiosConfig
		);

		setAssets(res.data.fetchedAssets);
		setCurrenAssetId(res.data.fetchedAssets[0].id);
	};

	const renderedAssets = Object.values(assets).map((asset) => {
		return (
			<option value={asset.id} key={asset.id}>
				{asset.brand} - {asset.model}
			</option>
		);
	});

	useEffect(() => {
		fetchAllAssets();
	}, []);

	return (
		<div>
			<div
				className="d-flex justify-content-center mb-2"
				style={{ clear: 'both' }}
			>
				<Button variant="primary" onClick={handleShow} disabled={!isActive}>
					Add asset
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add asset</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<select
						className="browser-default custom-select"
						onChange={handleAssetIdToadd}
					>
						{renderedAssets}
					</select>
				</Modal.Body>

				{errorMessage && (
					<Alert key={errorMessage} variant="danger">
						{errorMessage}
					</Alert>
				)}

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={addAssetToDeveloper}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ModalAssets;
