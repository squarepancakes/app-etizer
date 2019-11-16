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

const Logout = props => {
	logout();
	props.setLoginStatus(false);
	return <h3 className={"logoutMessage"}>See you tomorrow!</h3>;
};

export default Logout;
