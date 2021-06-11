import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const AssetsList = ({ assetsId }) => {
	const [assets, setAssets] = useState(null);

	const fetchAssets = async () => {
		const res = await axios.get("http://localhost:3000/assets/fetchAssets", {
			headers: {
				sessToken:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiZDgwM2I4LTg4YmUtNDAwNy04YTJhLTBiZWI3NjAxZjczYSIsImlhdCI6MTYyMzI4MzgyN30.h5YgyqlswdPRNKApbosNj6iHEfTMsPEYWChqKYDSoCE",
			},
			// data: {
			// 	assetsId,
			// },
		});

		setAssets(res.data.fetchedAssets);
	};

	useEffect(() => {
		fetchAssets();
	}, []);

	return (
		<div style={{ width: "48%" }}>
			<h3>Assets</h3>
			<ul className="assetsList">
				{assets &&
					assets.map((asset) => (
						<li key={asset.id}>
							<p className="brand">{asset.brand}</p>
							<p>{asset.model}</p>
							<p>{asset.type}</p>
						</li>
					))}
				{assets &&
					assets.map((asset) => (
						<li key={asset.id}>
							<p className="brand">{asset.brand}</p>
							<p>{asset.model}</p>
							<p>{asset.type}</p>
						</li>
					))}
				{assets &&
					assets.map((asset) => (
						<li key={asset.id}>
							<p className="brand">{asset.brand}</p>
							<p>{asset.model}</p>
							<p>{asset.type}</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default AssetsList;
