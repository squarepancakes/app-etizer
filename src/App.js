import React from "react";
import "./App.css";
import Cookbook from "./components/Cookbook";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { Header } from "./components/Header";
import RecipeSearch from "./components/RecipeSearch";

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
	return (
		<div className="main">
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/cookbook" component={Cookbook} />
					<Route exact path="/recipe search" component={RecipeSearch} />
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
