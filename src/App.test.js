import React from "react";
import AppWithBrowser, { App } from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("recipe-app", () => {
	const renderApp = () => {
		const history = createMemoryHistory();
		return render(
			<Router history={history}>
				<App />
			</Router>
		);
	};

	describe("header", () => {
		it("should display a nav bar", () => {
			const { getByTestId } = render(<AppWithBrowser />);
			expect(getByTestId("navBar")).toBeInTheDocument();
		});

		it("recipe search link should bring you to recipe search page", () => {
			const { getByTestId } = renderApp();
			const navBar = getByTestId("navBar");
			const recipeSearchBtn = within(navBar).getByText("Recipe Search");
			fireEvent.click(recipeSearchBtn);
			const recipeSearchPage = getByTestId("recipeSearchComponent");
			expect(recipeSearchPage).toBeInTheDocument();
		});

		it("cookbook link should bring you to cookbook page", () => {
			const { getByTestId } = renderApp();
			const navBar = getByTestId("navBar");
			const cookbookBtn = within(navBar).getByText("Cookbook");
			fireEvent.click(cookbookBtn);
			const cookbookPage = getByTestId("cookbookComponent");
			expect(cookbookPage).toBeInTheDocument();
		});

		it("should home link that brings you back to home ", () => {
			const { getByTestId } = renderApp();
			const navBar = within(getByTestId("navBar"));
			const recipeSearchBtn = navBar.getByText("Recipe Search");
			fireEvent.click(recipeSearchBtn);
			const homeButton = navBar.getByText("Home");
			fireEvent.click(homeButton);
			const homePage = getByTestId("home");
			expect(homePage).toBeInTheDocument();
		});
	});

	describe("homepage", () => {
		it("should display a welcome message", () => {
			const { getByText } = renderApp();
			expect(getByText("What's cooking?")).toBeInTheDocument();
		});

		it("should have a recipe search navBox that brings you to recipe search page", () => {
			const { getByTestId } = renderApp();
			const homePage = within(getByTestId("home"));
			const recipeSearchLink = homePage.getByText("Recipe Search");
			fireEvent.click(recipeSearchLink);
			const recipeSearchPage = getByTestId("recipeSearchComponent");
			expect(recipeSearchPage).toBeInTheDocument();
		});

		it("should have a recipe search navBox with a description", () => {
			const { getByTestId } = renderApp();
			const homePage = within(getByTestId("home"));
			expect(homePage.getByText("Find your meal now!")).toBeInTheDocument();
		});

		it("should have a cookbook navBox with a description", () => {
			const { getByTestId } = renderApp();
			const homePage = within(getByTestId("home"));
			expect(
				homePage.getByText("Cook your favourite recipe!")
			).toBeInTheDocument();
		});

		it("should have a cookbook navBox that brings you to cookbook page", () => {
			const { getByTestId } = renderApp();
			const homePage = within(getByTestId("home"));
			const cookbookLink = homePage.getByText("Cookbook");
			fireEvent.click(cookbookLink);
			const cookbookPage = getByTestId("cookbookComponent");
			expect(cookbookPage).toBeInTheDocument();
		});
	});
});
