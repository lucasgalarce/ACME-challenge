import React from "react";
import DeveloperCreate from "./DeveloperCreate";
import DeveloperList from "./DeveloperList";

const App = () => {
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
export default App;
