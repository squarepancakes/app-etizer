import React, { useState } from "react";
import "./App.css";
import Cookbook from "./components/Cookbook";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header } from "./components/Header";
import FindNewRecipes from "./components/FindNewRecipes";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup"
import Home from "./components/Home"

export function App() {
	const [userId, setUserId] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);
	return (
		<div className="main">
			<div>
				<Header loginStatus={loginStatus} />
				<Switch>
					<Route exact path="/" component={Home} />
					{loginStatus ? (
						<Route
							exact
							path="/cookbook"
							component={() => <Cookbook userId={userId} />}
						/>
					) : (
						""
					)}
					<Route exact path="/findnewrecipes" component={() => <FindNewRecipes />} />
					<Route
						exact
						path="/login"
						component={() => (
							<Login setUserId={setUserId} setLoginStatus={setLoginStatus} />
						)}
					/>
					<Route
						exact
						path="/logout"
						component={() => <Logout setLoginStatus={setLoginStatus} />}
					/>
					<Route exact path="/signup" component={Signup} />
					<Redirect to="/" />
				</Switch>
			</div>
		</div>
	);
}

export default () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
