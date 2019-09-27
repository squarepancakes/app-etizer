import React from "react";
import RecipeSearch from "./components/recipesearch";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import appleRecipesData from "./testUtils/appleRecipesData";
import mockFetch from "./testUtils/mock-fetch-util";

describe("recipe search component", () => {
	beforeEach(() => {
		mockFetch.restoreMock();
	});

	it("should display a input box", () => {
		const { getByPlaceholderText } = render(<RecipeSearch />);
		expect(
			getByPlaceholderText("Eg: Carrots, duck, vegetarian")
		).toBeInTheDocument();
	});

	it("should display a submit button", () => {
		const { getByText } = render(<RecipeSearch />);
		expect(getByText("Search for Recipes")).toBeInTheDocument();
	});

	it("should display text when typed into input box", () => {
		const { getByPlaceholderText, getByDisplayValue } = render(
			<RecipeSearch />
		);
		const inputBox = getByPlaceholderText("Eg: Carrots, duck, vegetarian");
		fireEvent.change(inputBox, { target: { value: "apple" } });
		expect(getByDisplayValue("apple")).toBeInTheDocument();
	});

	it("should fetch recipes' data when search for recipes button is pressed", async () => {
		mockFetch.mockOnce(appleRecipesData);
		const { getByText } = render(<RecipeSearch />);
		const searchBtn = getByText("Search for Recipes");
		fireEvent.click(searchBtn);
		await wait(() => getByText("Apple Elixir Recipe"));
		expect(getByText("Apple Elixir Recipe")).toBeInTheDocument();
	});
});
