import React from 'react';

const RecipeBox = props => {
	return (
		<div className="recipeShowcase">
			{props.list.map(aRecipe => {
				return (
					<div className="recipebox" key={aRecipe.recipe.url}>
						<h2 className="recipeTitle" key={aRecipe.recipe.label}>
							{aRecipe.recipe.label}
						</h2>
						<img src={aRecipe.recipe.image} alt={aRecipe.recipe.label} />
						<a
							className="recipeURL"
							rel="noopener noreferrer"
							target="_blank"
							href={aRecipe.recipe.url}
						>
							See Full Recipe
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default RecipeBox;