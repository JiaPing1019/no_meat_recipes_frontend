import React, { useState, useRef, useCallback } from "react";
import RecipeItem from "./RecipeItem";
import useRecipeSearch from "../helpers/useRecipeSearch";
import "../App.css";

const Recipe = () => {
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { recipes, hasMore, loading, error } = useRecipeSearch(
    ingredientQuery,
    pageNumber
  );

  const observer = useRef();
  // whenever the ref element is created, it gonna to call the function instead of using callback
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
    setIngredientQuery(e.target.value);
    // Everytime when we execute query, we need to set page back to the first page
    setPageNumber(1);
  }

  return (
    <>
      <div className="text-title">No Meat Recipes</div>
      <div className="text-title-slogan">Vegetarian taste better :)</div>

      <div className="recipe-container">
        <input
          type="text"
          value={ingredientQuery}
          onChange={handleSearch}
          placeholder="Search the recipes contain all ingredients. e.g. banana apple sugar, ..."
          className="text-search"
        />
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
      </div>
      <div className="text-infomation-msg">{loading && "Loading..."}</div>
      <div className="text-infomation-msg">{error && "Error"}</div>
    </>
  );
};

export default Recipe;
