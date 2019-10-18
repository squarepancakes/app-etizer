import React from "react";
import GetRecipe from "./GetRecipe";
import axios from "axios";

const CategoryButton = ({
	categorySelector,
	allCategories,
	selectedFilter = []
}) => {
	return (
		<div data-testid={"showcaseBox"} className="showcaseBox">
			<h2>Categories</h2>
			<div className={"showcaseBoxCategories"}>
				{allCategories.map((category, i) => {
					const isSelected = selectedFilter.some(
						item => item.toLowerCase() === category.toLowerCase()
					);
					const buttonStyle = isSelected ? { backgroundColor: "#f5d5be" } : {};
					return (
						<button
							key={i}
							onClick={categorySelector}
							value={category}
							style={buttonStyle}
						>
							{category}
						</button>
					);
				})}
			</div>
		</div>
	);
};

const RecipePost = ({
	name,
	recipeId,
	deleteRecipe,
	categories,
	ingredients,
	instructions,
	time,
	servings,
	userId
}) => {
	return (
		<div className={"recipePost"} data-testid={"recipePost"}>
			<button onClick={() => deleteRecipe(recipeId)}>X</button>
			<h2>{name}</h2>
			<div className={"Categories"}>
				<h3>{"Categories"}</h3>
				<div className={"category"}>
					{categories &&
						categories.map((cat, i) => {
							return <p key={cat}>{cat}</p>;
						})}
				</div>
			</div>
			<div className={"ingredients"}>
				<h3>{"Ingredients"} </h3>
				{ingredients.map((item, i) => {
					return <p key={i}>{item}</p>;
				})}
			</div>
			<div className={"directions"}>
				<h3>{"Directions"}</h3>
				<ul>
					{instructions.map((step, i) => {
						return <li key={i}>{step}</li>;
					})}
				</ul>
			</div>
			<div className={"time"}>
				<h3>{"Time Required"}</h3>
				<h4>{time}</h4>
			</div>
			<div className={"servings"}>
				<h3>{"Servings"}</h3>
				<h4>{servings}</h4>
			</div>
		</div>
	);
};

class Cookbook extends React.Component {
	constructor() {
		super();
		this.state = {
			recipes: [],
			selectedFilter: [],
			allCategories: []
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
		const baseUrl = "http://localhost:4000/users";
		const meResponse = await axios.get(`${baseUrl}/me`, {
			withCredentials: true
		});
		const username = meResponse.data.username;

		axios
			.get(`${baseUrl}/${username}`, { withCredentials: true })
			.then(res => {
				let totalCategories = [];
				res.data.recipes.forEach(recipe => {
					recipe.categories.forEach(category => {
						if (!totalCategories.includes(category)) {
							totalCategories.push(category);
						}
					});
				});
				console.log(res.data.recipes);
				this.setState({
					recipes: res.data.recipes,
					allCategories: totalCategories
				});
			})
			.catch(err => console.error(err));
	};

	deleteRecipe = id => {
		const url = `http://localhost:4000/recipes/${id}`;
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
				<GetRecipe showRecipes={this.showRecipes} userId={this.props.userId} />
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
								key={recipe.name}
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
