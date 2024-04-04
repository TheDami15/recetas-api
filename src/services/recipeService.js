import axios from 'axios';
import { isUserAuthenticated } from './authService';

// Obtiene el token del localStorage y retorna los headers de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const fetchRecipes = async (selectedAllergens, setLoading, setError, setRecipes) => {
  setLoading(true);
  setError(null);

  const endpoint = selectedAllergens.length > 0
    ? `https://apirecetes-50a9e4e6edb1.herokuapp.com/api/sin-alergenos/${selectedAllergens.join(',')}`
    : 'https://apirecetes-50a9e4e6edb1.herokuapp.com/api/';

  try {
    const response = await axios.get(endpoint);
    const filteredRecipes = filterRecipesByAllergens(response.data, selectedAllergens);
    setRecipes(filteredRecipes);
  } catch (error) {
    setError(error.response?.data.message ?? error.message);
  } finally {
    setLoading(false);
  }
};

const deleteRecipe = async (recipeId, fetchRecipesCallback) => {
  if (!isUserAuthenticated()) {
    alert('No estás autenticado o tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
    return;
  }

  try {
    await axios.delete(`https://apirecetes-50a9e4e6edb1.herokuapp.com/api/${recipeId}`, getAuthHeaders());
    fetchRecipesCallback(); // Llama a fetchRecipes después de eliminar con éxito
  } catch (error) {
    alert(error.response?.data.message ?? 'Error eliminando la receta');
  }
};
const filterRecipesByAllergens = (recipes, selectedAllergens) => {
  return recipes.filter(recipe => {
    return !selectedAllergens.some(allergen => recipe.alergenos.includes(allergen));
  });
};
export { fetchRecipes, deleteRecipe };
