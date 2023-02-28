import React, { useState, useEffect } from 'react';

function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleCuisineInputChange = event => {
    setCuisine(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    let apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=b4b8fd7f6f3e4108954c33af98f9e69a`;
    if (searchQuery) {
      apiUrl += `&query=${searchQuery}`;
    }
    if (cuisine) {
      apiUrl += `&cuisine=${cuisine}`;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setRecipes(data.results))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Search for recipes:
          <input type="text" value={searchQuery} onChange={handleSearchInputChange} />
        </label>
        <label>
          Filter by cuisine:
          <select value={cuisine} onChange={handleCuisineInputChange}>
            <option value="">Any cuisine</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="thai">Thai</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={`https://spoonacular.com/recipeImages/${recipe.image}`} alt={recipe.title} />
            <p>{recipe.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeFinder