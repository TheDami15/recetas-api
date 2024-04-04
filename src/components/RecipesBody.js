import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { isUserAuthenticated } from '../services/authService';
import AllergenFilter from './AllergenFilter'; // Ajusta la ruta según tu estructura
import RecipeCard from './RecipeCard'; // Ajusta la ruta según tu estructura
import '../styles/recipesBody.css';
import { fetchRecipes, deleteRecipe } from '../services/recipeService';



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
    fetchRecipes(selectedAllergens, setLoading, setError, setRecipes);
    setDisplayActionButtons(isUserAuthenticated());
  }, [selectedAllergens]);

  const handleAllergenChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAllergens(prev =>
      checked ? [...prev, value] : prev.filter(allergen => allergen !== value)
    );
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
            onDelete={() => deleteRecipe(recipe._id, () => fetchRecipes(selectedAllergens, setLoading, setError, setRecipes))}
            displayActionButtons={displayActionButtons}
          />

        ))}
      </div>
    </div>
  );
};

export default RecipesBody;
