import React, { useState } from "react";
import "./App.css";
import Cookbook from "./components/Cookbook";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Header } from "./components/Header";
import FindNewRecipes from "./components/FindNewRecipes";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

const navigator = [
	{ title: "Find new recipes", description: "Discover new recipes!", link: "findnewrecipes" },
	{ title: "Cookbook", description: "Cook your favourite recipe!", link: "cookbook" }
];

const Home = () => {
	return (
		<div data-testid={"home"} className={"home"}>
			<h1>What's cooking?</h1>
			<div className={"navBoxContainer"}>
				{navigator.map((page, i) => {
					return (
						<Link key={page.title} to={`/${page.link}`}>
							<div className="navBox" key={i}>
								<h2>{page.title}</h2>
								<p>{page.description}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export function App() {
	const [userId, setUserId] = useState("");

	return (
		<div className="main">
			<div>
				<Header/>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/cookbook"
						component={() => <Cookbook userId={userId} />}
					/>
					<Route
						exact
						path="/findnewrecipes"
						component={() => <FindNewRecipes />}
					/>
					<Route
						exact
						path="/login"
						component={() => <Login setUserId={setUserId} />}
					/>
					<Route exact path="/logout" component={Logout} />
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
