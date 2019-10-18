import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<div data-testid={"navBar"} className="navBar">
			<Link to="/">Home</Link>
			<Link to="/recipe search">Recipe Search</Link>
			<Link to="/cookbook">Cookbook</Link>
			<Link to="/login">Login</Link>
			<Link to="/logout">Logout</Link>
		</div>
	);
};
