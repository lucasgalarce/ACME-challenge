import React from "react";
import axios from "axios";
import "./App.css";

const AssetsList = ({ assets }) => {
	return (
		<div style={{ width: "48%" }}>
			<h3>Assets</h3>
			<ul className="assignmentsList">
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