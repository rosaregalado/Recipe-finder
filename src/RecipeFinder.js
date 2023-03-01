import React, { useState } from 'react';

function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleCuisineInputChange = event => {
    setCuisine(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    let apiUrl = 'http://localhost:3000/recipes?';
    if (searchQuery) {
      apiUrl += `query=${searchQuery}&`;
    }
    if (cuisine) {
      apiUrl += `cuisine=${cuisine}&`;
    }
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.${recipe.imageType}`} alt={recipe.title} />
            <p>{recipe.summary}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeFinder;
