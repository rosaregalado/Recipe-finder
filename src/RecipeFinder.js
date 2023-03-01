import React, { useState } from 'react';

function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineInputChange = e => {
    setCuisine(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
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
    <div className="max-w-screen-xl mx-auto py-9">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Recipe Finder</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-wrap mb-4">
        <label className="w-full w-1/2 pr-4">
          <span className="block mb-2 font-bold">Search for recipes:</span>
          <input 
            type="text" 
            value={searchQuery}
            placeholder="Enter a food name or ingredient"
            onChange={handleSearchInputChange} className="border border-orange-400 rounded p-2 w-full" />
        </label>
        <label className="w-full w-1/2">
          <span className="block mb-2 font-bold">Filter by cuisine:</span>
          <select value={cuisine} onChange={handleCuisineInputChange} className="border border-orange-400 rounded p-2 w-full">
            <option value="">Any cuisine</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="thai">Thai</option>
          </select>
        </label>
        <div className="my-5">
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Search</button>
        </div>
      </form>
      {loading ? (
        <p className="text-xl mt-4">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-orange rounded-lg shadow-lg overflow-hidden">
              <img src={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.${recipe.imageType}`} alt={recipe.title} className="w-full h-56 object-cover" />
              <div className="px-4 py-2">
                <h2 className="font-semibold text-lg text-orange-700 mb-2">{recipe.title}</h2>
                <p className="text-gray-700 text-sm">{recipe.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeFinder;
