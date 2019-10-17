import React from "react";
import Loader from "./Loader";
import axios from "axios";

class GetRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputVal: "",
			totalCatergories: ["dessert", "vegetarian", "italian", "quick meals"],
			newRecipe: [],
			isLoading: false
		};
	}

	handleChange = event => {
		this.setState({ inputVal: event.target.value });
	};

	componentDidMount() {
		this.addRecipe();
	}

	addRecipe = async () => {
		if (this.state.inputVal !== "") {
			this.setState({ isLoading: true });
			const newScraper = "https://recipe-server-js.herokuapp.com/recipe?url=";
			let recipe = await fetch(`${newScraper}${this.state.inputVal}`);
			const data = await recipe.json();
			const aNewRecipe = {
				name: data.name,
				ingredients: data.ingredients,
				instructions: data.instructions,
				time: data.time.total ? data.time.total : data.time,
				servings: data.servings,
				categories: ["Vegetarian", "Dessert"]
			};

			console.log(aNewRecipe)

			const url = "http://localhost:4000/recipes/new";
			axios.post(url, aNewRecipe, { withCredentials: true }).then(() => 
			{
				this.setState({ inputVal: "", isLoading: false });
				this.props.addRecipe(aNewRecipe);

			}
			);

		}
	};

	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<Loader />
				) : (
					<div className="userAddComponent">
						<h2>Add New Recipes</h2>
						<input
							placeholder={"URL of new Recipe!"}
							aria-label={"inputNewRecipeURL"}
							type={"text"}
							value={this.state.inputVal}
							onChange={this.handleChange}
						/>
						<button onClick={this.addRecipe}>Add Recipe</button>
					</div>
				)}
			</div>
		);
	}
}

export default GetRecipe;
