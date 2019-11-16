import React from "react";

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

export default CategoryButton;