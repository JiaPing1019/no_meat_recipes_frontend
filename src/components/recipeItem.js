import React from "react";
import "./../App.css";

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
      <h2 className="card-title">{title}</h2>
      <img src={imageUrl} className="round-img card-img" alt="" />
      <div className="card-content">
        <div className="card-content-item">● Category: {catogoryName}</div>
        {cuisine ? (
          <div className="card-content-item">● Cuisine: {cuisine}</div>
        ) : null}
        <div className="card-content-item">● Ratings: {ratings}</div>
        <div className="card-content-item">● Cook time: {cookTime}</div>
        <div className="card-content-item">● Prep time: {prepTime}</div>
        <div className="card-content-item">
          ● Ingredients:{" "}
          {ingredients.map((ingredient) => (
            <div className="card-content-item-list">○ {ingredient.name}</div>
          ))}
        </div>
        <div className="card-content-author">By {author}</div>
      </div>
    </div>
  );
};

export default RecipeItem;
