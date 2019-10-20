import React from "react";
import axios from "axios";

const logout = () => {
	const url = `http://localhost:4000/users/logout`;
	axios
		.post(url, {}, { withCredentials: true })
		.then(() => {})
		.catch(err => {
			console.error(err);
		});
	return "/login";
};

const Logout = () => {
	logout();
	return <div>See you tomorrow!</div>;
};

export default Logout;
