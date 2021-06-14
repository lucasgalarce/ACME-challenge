import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const ModalAssets = ({ developerId, isActive }) => {
	const [show, setShow] = useState(false);
	const [assets, setAssets] = useState({});
	const [currentAssetId, setCurrenAssetId] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAssetIdToadd = (e) => {
		setCurrenAssetId(e.target.value);
	};

	const axiosConfig = {
		headers: {
			sessToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE",
		},
	};

	const addAssetToDeveloper = async () => {
		const data = {
			developerId,
			assetId: currentAssetId,
		};

		await axios.post(
			"http://localhost:3000/developers/addAssetToDeveloper",
			data,
			axiosConfig
		);

		handleClose();
		setCurrenAssetId(assets[0].id);
	};

	const fetchAllAssets = async () => {
		const res = await axios.get(
			"http://localhost:3000/assets/fetchAllAssets",
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
				style={{ clear: "both" }}
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
