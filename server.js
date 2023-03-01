const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// proxy for images
app.get('/recipeImage/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://spoonacular.com/recipeImages/${id}`);
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).send('Not found');
  }
});

app.get('/recipes', (req, res) => {
  const query = req.query.query;
  const cuisine = req.query.cuisine;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}&addRecipeInformation=true`;

  if (query) {
    apiUrl += `&query=${query}`;
  }
  if (cuisine) {
    apiUrl += `&cuisine=${cuisine}`;
  }
  axios
    .get(apiUrl)
    .then((response) => res.json(response.data.results))
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
