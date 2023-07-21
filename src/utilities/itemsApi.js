import sendRequest from './sendRequest';
import axios from 'axios'
const BASE_URL = '/api/items';

const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  params:{},
  headers: {
    'X-RapidAPI-Key': 'e746303ec9mshf43480a6fe1c65dp1b7602jsna35486073089',
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
}

const recipeInfoOptions = {
  method: 'GET',
  url: '',
  headers: {
    'X-RapidAPI-Key': 'e746303ec9mshf43480a6fe1c65dp1b7602jsna35486073089',
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
}

export function getAll() {
  return sendRequest(BASE_URL);
}

export function makeItem(newItem) {
    return sendRequest(`${BASE_URL}/create`,'POST', newItem);
  }

export function updateItem(id, itemChanges) {
    return sendRequest(`${BASE_URL}/${id}/update`,'PUT', itemChanges);
}

export function deleteItem(id) {
  return sendRequest(`${BASE_URL}/${id}`,'DELETE');
}

export async function getRecipes(params) {
  options.params = params
  try {
    const response = await axios.request(options)
    return response.data
  } catch(err) {
    console.log(err)
  }
}

export async function getSpecificRecipe(id) {
  recipeInfoOptions.url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`
  try {
    const response = await axios.request(recipeInfoOptions)
    console.log(response.data)
  } catch(err) {
    console.log(err)
  }
}