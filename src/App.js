import React, { useState, useRef, useCallback } from "react";
import useRecipeSearch from "./useRecipeSearch";
import RecipeItem from "./components/recipeItem.js";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { recipes, hasMore, loading, error } = useRecipeSearch(
    query,
    pageNumber
  );

  const observer = useRef();
  // whenever the ref element is create, it's gonna to call the function instead of using callback
  const lastRecipeElementRef = useCallback(
    (node) => {
      if (loading) return;

      // discounnnect our observer from the previous element
      // so that our new last element will be hooked up correctly
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    const { value } = e.target;
    setQuery(e.target.value);
    // Everytime when we query, we want to set the page back to the first page
    setPageNumber(1);
  }

  return (
    <div className="container">
      <div className="text-title">No Meat Recipes</div>
      <div className="text-title-slogan">Vegetarian taste better :)</div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search ingredients. e.g. banana, apple, sugar, ..."
        className="text-search"
      />
      <div className="recipe-container">
        {recipes.map((recipe, index) => {
          if (recipes.length === index + 1) {
            return (
              <div
                ref={lastRecipeElementRef}
                className="recipe-info"
                key={recipe.recipeId}
              >
                <RecipeItem recipe={recipe} />
              </div>
            );
          } else {
            return (
              <div className="recipe-info" key={recipe.recipeId}>
                <RecipeItem recipe={recipe} />
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>
    </div>
  );
}

export default App;
