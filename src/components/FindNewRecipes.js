import React from "react";
import Loader from "./Loader";
import RecipeBox from "./RecipeBox";
// import Logo from "../assets/Logo.png";
class RecipeSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeList: [],
			isLoading: false
		};
	}

	submitRequest = async event => {
		try {
			event.preventDefault();
			this.setState({ isLoading: true });
			let query = event.target.elements.query.value;
			const proxy = "https://cors-anywhere.herokuapp.com/";
			const response = await fetch(
				`${proxy}https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
			);

			const data = await response.json();
			const recipeList = data.hits;
			if (recipeList.length === 0) {
				return <h3>No relevant recipes, please try again.</h3>;
			}
			this.setState({
				recipeList: recipeList,
				isLoading: false
			});
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<div className="background">
				<div className={"recipeSearch"} data-testid={"recipeSearchComponent"}>
					{/* <img src={Logo} alt="app-etizer" /> */}
					<h2>Discover new recipes!</h2>
					<form
						aria-label={"searchForm"}
						className="searchForm"
						onSubmit={this.submitRequest}
					>
						<input
							placeholder="Eg: Carrots, duck, vegetarian"
							name={"query"}
						></input>
						<button>Search for Recipes</button>
					</form>
					{this.state.isLoading ? (
						<Loader />
					) : (
						<RecipeBox list={this.state.recipeList} />
					)}
				</div>
			</div>
		);
	}
}

export default RecipeSearch;
