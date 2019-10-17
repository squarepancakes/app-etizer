import React from "react";
// import Printing from "./PrintingData";
import { totalCatergories } from "../data/recipelist";
import GetRecipe from "./GetRecipe";
import axios from "axios";

const CategoryButton = ({ categorySelector, selectedFilter = [] }) => {
	return (
		<div data-testid={"showcaseBox"} className="showcaseBox">
			<h2>Catergories</h2>
			<div className={"showcaseBoxCatergories"}>
				{totalCatergories.map((category, i) => {
					const isSelected = selectedFilter.some(
						item => item.toLowerCase() === category.toLowerCase()
					);
					// console.log(isSelected, category);
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
	catergories,
	ingredients,
	instructions,
	time,
	servings
}) => {
	return (
		<div className={"recipePost"} data-testid={"recipePost"}>
			<h2>{name}</h2>
			<div className={"Categories"}>
				<h3>{"Categories"}</h3>
				<div className={"catergory"}>
					{catergories &&
						catergories.map((cat, i) => {
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
			userAddedRecipes: [],
			selectedFilter: []
		};
	}

	// selectedFilter = event => {
	// 	const onPressCategory = event.target.value;
	// 	const selectedFilter = this.state.selectedFilter;
	// 	selectedFilter.map(oneFilter => {
	// 		if (onPressCategory === oneFilter) {
	// 			console.log("remove");
	// 			return "removeFilter";
	// 		} else {
	// 			console.log("add");
	// 			return "addFilter";
	// 		}
	// 	});
	// };

	categorySelector = event => {
		const onPressCategory = event.target.value;
		const containsCategory = this.state.selectedFilter.some(
			catergory => catergory === onPressCategory
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
		const url = "http://localhost:4000/recipes";
		axios.get(url, { withCredentials: true }).then(res => {
			console.log(res.data);
			this.setState({ recipes: res.data });
		});
	};

	// addUserAddedRecipe = newRecipe => {
	// 	this.setState({
	// 		userAddedRecipes: [...this.state.userAddedRecipes, newRecipe]
	// 	});
	// };

	getFilteredRecipes = () => {
		const allRecipe = [...this.state.recipes, ...this.state.userAddedRecipes];
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
				{/* <Printing /> */}
				<GetRecipe addUserAddedRecipe={this.addUserAddedRecipe} />
				<CategoryButton
					categorySelector={this.categorySelector}
					selectedFilter={this.state.selectedFilter}
				/>
				<div data-testid="filteredRecipe">
					{this.getFilteredRecipes().map(recipe => {
						return (
							<RecipePost
								key={recipe.name}
								name={recipe.name}
								catergories={recipe.categories}
								ingredients={recipe.ingredients}
								instructions={recipe.instructions}
								time={recipe.time}
								servings={recipe.servings}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Cookbook;
