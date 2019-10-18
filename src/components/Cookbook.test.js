import React from "react";
import Cookbook from "./Cookbook";
import { render, fireEvent, wait, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import mockFetch from "../testUtils/mock-fetch-util";
import halvaData from "../testUtils/halvaData";

describe("cookbook component", () => {

	describe("add new recipe component", () => {
		it("should have a subheading", () => {
			const { getByText } = render(<Cookbook />);
			expect(getByText("Add New Recipes")).toBeInTheDocument();
		});

		it("should display an input box", () => {
			const { getByLabelText } = render(<Cookbook />);
			expect(getByLabelText("inputNewRecipeURL")).toBeInTheDocument();
		});

		it("should display an add recipe button", () => {
			const { getByText } = render(<Cookbook />);
			expect(getByText("Add Recipe")).toBeInTheDocument();
		});

		xit("should display text as typed into the input box", () => {
			const { getByLabelText, getByDisplayValue } = render(<Cookbook />);
			const inputBox = getByLabelText("inputNewRecipeURL");
			const url = "https://www.epicurious.com/recipes/food/views/halva-5-ways";
			fireEvent.change(inputBox, { target: { value: url } });
			expect(getByDisplayValue(url)).toBeInTheDocument();
		});

		xit("should add a recipe to the page", async () => {
			mockFetch.mockOnce(halvaData);
			const { getByLabelText, getByText } = render(<Cookbook />);
			const inputBox = getByLabelText("inputNewRecipeURL");
			const addRecipeBtn = getByText("Add Recipe");
			const url = "https://www.epicurious.com/recipes/food/views/halva-5-ways";
			fireEvent.change(inputBox, { target: { value: url } });
			fireEvent.click(addRecipeBtn);
			await wait(() => getByText("Halva 5 Ways"));
			expect(getByText("Halva 5 Ways")).toBeInTheDocument();
		});
	});

	describe("catergory filters", () => {
		it("should have a subheading", () => {
			const { getByTestId } = render(<Cookbook />);
			const catergoriesSection = within(getByTestId("showcaseBox"));
			expect(catergoriesSection.getByText("Catergories")).toBeInTheDocument();
		});

		it("should have show recipes that are vegetarian when vegetarian catergory button is clicked", () => {
			const { getByTestId } = render(<Cookbook />);
			const catergoriesSection = within(getByTestId("showcaseBox"));
			const catergoryFilter = catergoriesSection.getByText("Vegetarian");
			fireEvent.click(catergoryFilter);

			const filteredRecipe = getByTestId("filteredRecipe");
			const vegeterianRecipes = within(filteredRecipe).getAllByText("Vegetarian");
			expect(vegeterianRecipes).toHaveLength(2);
        });
        
        it("should have show recipes that are vegetarian when vegetarian catergory button is clicked", () => {
            const { getByTestId } = render(<Cookbook />);
            const catergoriesSection = within(getByTestId("showcaseBox"));
            const catergoryFilter = catergoriesSection.getByText("Dessert");
            fireEvent.click(catergoryFilter);
            const filteredRecipe = getByTestId("filteredRecipe");
            const dessertRecipes = within(filteredRecipe).getAllByText("Dessert");
            expect(dessertRecipes).toHaveLength(1);
        
        });

        
	});
});
