import React from "react";
import "./App.css";

const AssetsList = ({ assets }) => {
	return (
		<div style={{ width: "48%", float: "left" }}>
			<h3 className="text-center">Assets</h3>
			<ul className="assignmentsList">
				{assets &&
					assets.map((asset) => (
						<li key={asset.id}>
							<p className="model">{asset.model}</p>
							<p>Brand: {asset.brand}</p>
							<p>Type: {asset.type}</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default AssetsList;
