import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const ModalLicenses = ({ developerId, isActive }) => {
	const [show, setShow] = useState(false);
	const [licenses, setLicenses] = useState({});
	const [currentLicenseId, setCurrenLicenseId] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAssetIdToadd = (e) => {
		setCurrenLicenseId(e.target.value);
	};

	const axiosConfig = {
		headers: {
			sessToken:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE",
		},
	};

	const addLicenseToDeveloper = async () => {
		const data = {
			developerId,
			licenseId: currentLicenseId,
		};

		await axios.post(
			"http://localhost:3000/developers/addLicenseToDeveloper",
			data,
			axiosConfig
		);

		handleClose();
		setCurrenLicenseId(licenses[0].id);
	};

	const fetchAllLicenses = async () => {
		const res = await axios.get(
			"http://localhost:3000/licenses/fetchAllLicenses",
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
				style={{ clear: "both" }}
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
