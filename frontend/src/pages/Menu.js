import React from "react";
import DeveloperList from "../DeveloperList";
import DeveloperCreate from "../DeveloperCreate";
const Menu = () => {
	return (
		<div className="container">
			<h1>Create Developer</h1>
			<DeveloperCreate />
			<hr />
			<h1>Developers</h1>
			<DeveloperList />
		</div>
	);
};

export default Menu;
