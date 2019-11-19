import React from "react";
import GetRecipe from "./GetRecipe";
import axios from "axios";
import CategoryButton from "../common/CategoryButton";
import RecipePost from "./RecipePost";
class Cookbook extends React.Component {
	constructor() {
		super();
		this.state = {
			recipes: [],
			selectedFilter: [],
			allCategories: [],
			userId: ""
		};
	}

	categorySelector = event => {
		const onPressCategory = event.target.value;
		const containsCategory = this.state.selectedFilter.some(
			category => category === onPressCategory
		);
		if (!containsCategory) {
			this.setState({
				selectedFilter: [...this.state.selectedFilter, onPressCategory]
			});
		} else {
			this.setState({
				selectedFilter: [
					...this.state.selectedFilter.filter(
						filter => filter !== onPressCategory
					)
				]
			});
		}
	};

	componentDidMount = () => {
		this.showRecipes();
	};

	showRecipes = async () => {
		try {
			const meResponse = await axios.get(`${process.env.REACT_APP_URL}/users/me`, {
				withCredentials: true
			});
			const username = meResponse.data.username;

			axios
				.get(`${process.env.REACT_APP_URL}/users/${username}`, { withCredentials: true })
				.then(res => {
					let totalCategories = [];
					res.data.recipes.forEach(recipe => {
						recipe.categories.forEach(category => {
							if (!totalCategories.includes(category)) {
								totalCategories.push(category);
							}
						});
					});
					this.setState({
						recipes: res.data.recipes,
						allCategories: totalCategories,
						userId: this.props.userId
					});
				})
				.catch(err => console.error(err));
		} catch (err) {
			console.error(err);
		}
	};

	deleteRecipe = id => {
		const url = `${process.env.REACT_APP_URL}recipes/${id}`;
		axios.delete(url, { withCredentials: true }).then(res => {
			this.setState({ recipes: res.data });
		});
	};

	getFilteredRecipes = () => {
		const allRecipe = this.state.recipes;
		if (this.state.selectedFilter.length === 0) {
			return allRecipe;
		}
		return allRecipe.filter(obj => {
			const getRecipesContainingAllFilters = (
				categoriesInRecipe,
				allSelectedFilters
			) => {
				for (let filter of allSelectedFilters) {
					if (!categoriesInRecipe.some(item => item === filter)) {
						return false;
					}
				}
				return true;
			};
			return getRecipesContainingAllFilters(
				obj.categories,
				this.state.selectedFilter
			);
		});
	};

	render() {
		return (
			<div data-testid={"cookbookComponent"} className="cookbook">
				<GetRecipe showRecipes={this.showRecipes} userId={this.state.userId} />
				<CategoryButton
					allCategories={this.state.allCategories}
					categorySelector={this.categorySelector}
					selectedFilter={this.state.selectedFilter}
				/>
				<div data-testid="filteredRecipe">
					{this.getFilteredRecipes().map(recipe => {
						return (
							<RecipePost
								deleteRecipe={this.deleteRecipe}
								key={recipe._id}
								recipeId={recipe._id}
								name={recipe.name}
								categories={recipe.categories}
								ingredients={recipe.ingredients}
								instructions={recipe.instructions}
								time={recipe.time}
								servings={recipe.servings}
								userId={this.props.userId}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Cookbook;
