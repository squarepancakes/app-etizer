import React from "react";
import Loader from "./Loader";
import axios from "axios";

class GetRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputVal: "",
			totalCategories: [
				"Quick meals",
				"Vegetarian",
				"Meals",
				"Dessert",
				"Poultry",
				"Seafood",
				"Meat"
			],
			selectedCategories: [],
			isLoading: false
		};
	}

	handleChange = event => {
		this.setState({ inputVal: event.target.value });
	};

	addRecipe = async () => {
		if (
			this.state.inputVal !== "" &&
			this.state.selectedCategories.length > 0
		) {
		

			this.setState({ isLoading: true });
			const newScraper = "https://recipe-server-js.herokuapp.com/recipe?url=";
			let recipe = await fetch(`${newScraper}${this.state.inputVal}`);
			const data = await recipe.json();

			const aNewRecipe = {
				name: data.name,
				ingredients: data.ingredients,
				instructions: data.instructions,
				time: data.time.total,
				servings: data.servings,
				categories: this.state.selectedCategories,
				user: this.props.userId
			};

			const url = "http://localhost:4000/recipes/new";
			axios.post(url, aNewRecipe, { withCredentials: true }).then(() => {
				this.setState({ inputVal: "", isLoading: false });
				this.setState({ selectedCategories: [] });
				this.props.showRecipes();
			});
		}
	};

	handleCheckboxChanges = event => {
		const checked = event.target.value;
		this.state.selectedCategories.push(checked);
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
						<div className={"categoriesCheckboxes"}>
						<p>Select categories for the recipe</p>
							{this.state.totalCategories.map(category => {
								return (
									<div key={category} className={"individualCheckboxes"}>
										<input
											onChange={this.handleCheckboxChanges}
											type="checkbox"
											name="categories"
											value={category}
										/>
										<label>{category}</label>
									</div>
								);
							})}
						</div>
						<button onClick={this.addRecipe}>Add Recipe</button>
					</div>
				)}
			</div>
		);
	}
}

export default GetRecipe;
