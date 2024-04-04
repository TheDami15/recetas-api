import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { filterRecipesByAllergens } from '../services/filterUtils';
import { isUserAuthenticated } from '../services/authService';
import axios from 'axios';
import AllergenFilter from './AllergenFilter'; // Ajusta la ruta según tu estructura
import RecipeCard from './RecipeCard'; // Ajusta la ruta según tu estructura
import '../styles/recipesBody.css';

const RecipesBody = () => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const commonAllergens = ['huevos', 'gluten', 'lácteos', 'pescado', 'vegano', 'sugar-free'];
  const location = useLocation();
  const [displayActionButtons, setDisplayActionButtons] = useState(isUserAuthenticated());


  // Este useEffect lee los parámetros de la URL y establece el estado inicial
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter');
    if (initialFilter) {
      setSelectedAllergens(initialFilter.split(','));
    }
  }, [location]); // Se ejecuta una vez al cargar el componente o cuando cambia la URL

  useEffect(() => {
    fetchRecipes();
    setDisplayActionButtons(isUserAuthenticated());
    console.log(displayActionButtons);
  }, [selectedAllergens]);

  const handleAllergenChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAllergens(prev =>
      checked ? [...prev, value] : prev.filter(allergen => allergen !== value)
    );
  };

  const deleteRecipe = async (recipeId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No estás autenticado o tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      return;
    }

    try {
      await axios.delete(`https://apirecetes-50a9e4e6edb1.herokuapp.com/api/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      fetchRecipes();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
          // Aquí decides no registrar este tipo de errores en la consola, ya que es un comportamiento esperado
        } else {
          // Para otros tipos de errores, aún podrías querer ver los detalles en la consola
          console.error('Error deleting recipe:', error);
          setError(error.response.data.message ? error.response.data.message : 'Error eliminando la receta');
        }
      } else {
        // Para errores de red o cualquier otro error inesperado, también registras en la consola
        console.error('Error de conexión o desconocido:', error);
        setError('Ha ocurrido un error de conexión. Por favor, intenta nuevamente.');
      }
    }

  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null); // Reiniciamos el estado de error
    const endpoint = selectedAllergens.length > 0
      ? `https://apirecetes-50a9e4e6edb1.herokuapp.com/api/sin-alergenos/${selectedAllergens.join(',')}`
      : 'https://apirecetes-50a9e4e6edb1.herokuapp.com/api/';
    try {
      // Usamos axios.get en lugar de fetch
      const response = await axios.get(endpoint);
      // Axios envuelve la respuesta bajo la propiedad data, por lo que no necesitas llamar a .json()
      const filteredRecipes = filterRecipesByAllergens(response.data, selectedAllergens);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Axios maneja los errores un poco diferente, así que puedes querer ajustar cómo accedes al mensaje de error
      setError(error.response && error.response.data.message ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAllergenCheckboxes = () => {
    return commonAllergens.map(allergen => (
      <div key={allergen}>
        <input
          type="checkbox"
          id={allergen}
          value={allergen}
          onChange={handleAllergenChange}
          checked={selectedAllergens.includes(allergen)}
        />
        <label htmlFor={allergen}>{allergen}</label>
      </div>
    ));
  };

  return (
    <div className='body'>
      {/* Otros elementos UI */}
      <div className='filter-container'>
        <h1>Select allergens to exclude:</h1>
        <AllergenFilter
          commonAllergens={commonAllergens}
          selectedAllergens={selectedAllergens}
          handleAllergenChange={handleAllergenChange}
        />
        {displayActionButtons && (
          <div className='createrecipe'>
            <Link to="/formrecipes">
              <button className="createbtn">
                <i className='bx bxs-book-heart bx-tada'></i>
              </button>
            </Link>
          </div>
        )}
      </div>
  
      <div className='recipes-grid'>
        {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            deleteRecipe={deleteRecipe}
            displayActionButtons={displayActionButtons}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesBody;
