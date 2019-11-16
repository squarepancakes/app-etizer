import React from "react";
import TrashIcon from "../assets/icons8-trash-96.png";

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
			<h2>{name}</h2>
			<div className={"Categories"}>
				<h3>{"Categories"}</h3>
				<div className={"category"}>
					{categories &&
						categories.map((cat, i) => {
							return <p key={cat + i}>{cat}</p>;
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
			<img
				src={TrashIcon}
				alt={"delete icon"}
				onClick={() => deleteRecipe(recipeId)}
			></img>
			<div className={"servings"}>
				<h3>{"Servings"}</h3>
				<h4>{servings}</h4>
			</div>
		</div>
	);
};

export default RecipePost;
