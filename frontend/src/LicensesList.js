import React from "react";
import "./App.css";

const LicensesList = ({ licenses }) => {
	return (
		<div style={{ width: "48%" }}>
			<h3>Licenses</h3>
			<ul className="assignmentsList">
				{licenses &&
					licenses.map((license) => (
						<li key={license.id}>
							<p className="brand">{license.software}</p>
						</li>
					))}
			</ul>
		</div>
	);
};

export default LicensesList;