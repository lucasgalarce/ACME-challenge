import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const ModalLicenses = ({
	developerId,
	isActive,
	fetchDevelopers,
	userToken,
}) => {
	const [show, setShow] = useState(false);
	const [licenses, setLicenses] = useState({});
	const [currentLicenseId, setCurrenLicenseId] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const handleClose = () => {
		setShow(false);
		setErrorMessage(null);
	};
	const handleShow = () => setShow(true);

	const handleAssetIdToadd = (e) => {
		setCurrenLicenseId(e.target.value);
	};

	const axiosConfig = {
		headers: {
			sessToken: userToken,
		},
	};

	const { REACT_APP_API_URL } = process.env;

	const addLicenseToDeveloper = async () => {
		const data = {
			developerId,
			licenseId: currentLicenseId,
		};

		const res = await axios.post(
			`${REACT_APP_API_URL}/developers/addLicenseToDeveloper`,
			data,
			axiosConfig
		);

		if (res.data.Response) {
			handleClose();
			setCurrenLicenseId(licenses[0].id);
			fetchDevelopers();
		} else {
			setErrorMessage(res.data.Message);
		}
	};

	const fetchAllLicenses = async () => {
		const res = await axios.get(
			`${REACT_APP_API_URL}/licenses/fetchAllLicenses`,
			axiosConfig
		);

		setLicenses(res.data.fetchedLicenses);
		setCurrenLicenseId(res.data.fetchedLicenses[0].id);
	};

	const renderedLicenses = Object.values(licenses).map((license) => {
		return (
			<option value={license.id} key={license.id}>
				{license.software}
			</option>
		);
	});

	useEffect(() => {
		fetchAllLicenses();
	}, []);

	return (
		<div>
			<div
				className="d-flex justify-content-center mb-2"
				style={{ clear: 'both' }}
			>
				<Button variant="primary" onClick={handleShow} disabled={!isActive}>
					Add license
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Lisences</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<select
						className="browser-default custom-select"
						onChange={handleAssetIdToadd}
					>
						{renderedLicenses}
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
					<Button variant="primary" onClick={addLicenseToDeveloper}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ModalLicenses;
