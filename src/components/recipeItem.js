import React from "react";

const RecipeItem = ({
  recipe: {
    title,
    catogoryName,
    imageUrl,
    ratings,
    cookTime,
    prepTime,
    cuisine,
    author,
    ingredients,
  },
}) => {
  return (
    <div className="card">
      <h2 className="text-primary">{title}</h2>
      <img
        src={imageUrl}
        className="round-img"
        alt=""
        style={{ width: "400px", height: "400px" }}
      />
      <div className="text-secondary">
        <div className="">Category: {catogoryName}</div>
        <div className="">Cuisine: {cuisine}</div>
        <div className="">Ratings: {ratings}</div>
        <div className="">Cook time: {cookTime}</div>
        <div className="">Prep time: {prepTime}</div>
        <div className="">
          Ingredients {ingredients.map((ingredient) => ingredient.name)}
        </div>
        <div className="">By {author}</div>
      </div>
    </div>
  );
};

export default RecipeItem;
