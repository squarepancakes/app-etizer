import React, { useState } from "react";
import "./App.css";
import Cookbook from "./components/Cookbook";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Header } from "./components/Header";
import RecipeSearch from "./components/RecipeSearch";
import Login from "./components/Login";
import Logout from "./components/Logout";

const navigator = [
	{ title: "Recipe Search", description: "Find your meal now!" },
	{ title: "Cookbook", description: "Cook your favourite recipe!" }
];

const Home = () => {
	return (
		<div data-testid={"home"} className={"home"}>
			<h1>What's cooking?</h1>
			<div className={"navBoxContainer"}>
				{navigator.map((page, i) => {
					return (
						<Link key={page.title} to={`/${page.title}`}>
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
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/cookbook"
						component={() => <Cookbook userId={userId} />}
					/>
					<Route
						exact
						path="/recipe search"
						component={() => <RecipeSearch />}
					/>
					<Route
						exact
						path="/login"
						component={() => <Login setUserId={setUserId} />}
					/>
					<Route exact path="/logout" component={Logout} />
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
