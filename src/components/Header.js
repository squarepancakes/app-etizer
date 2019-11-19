import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ loginStatus }) => {
	return (
		<div data-testid={"navBar"} className="navBar">
			<Link to="/">Home</Link>

			<Link to="/findnewrecipes">Find Recipes</Link>
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
