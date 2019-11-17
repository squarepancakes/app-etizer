import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../assets/Logo.png";

export const Header = ({ loginStatus }) => {
	return (
		<div data-testid={"navBar"} className="navBar">
			{/* <Link to="/">Home</Link> */}
			{/* <img src={Logo} alt="app-etizer" /> */}
			<Link to="/">App-etizer!</Link>
			{loginStatus ? <Link to="/cookbook">Cookbook</Link> : ""}
			<div className="members">
				{loginStatus ? (
					<Link to="/logout">Logout</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
				<Link to="/signup">Signup</Link>
			</div>
		</div>
	);
};
