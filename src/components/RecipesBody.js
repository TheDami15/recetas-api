import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { filterRecipesByAllergens  } from '../services/filterUtils';
import '../styles/recipesBody.css';

const RecipesBody = () => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const commonAllergens = ['huevos', 'gluten', 'lácteos', 'pescado'];
  const location = useLocation();

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
  }, [selectedAllergens]);

  const handleAllergenChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAllergens(prev => 
      checked ? [...prev, value] : prev.filter(allergen => allergen !== value)
    );
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null); // Reiniciamos el estado de error
    const endpoint = selectedAllergens.length > 0
      ? `https://apirecetes-50a9e4e6edb1.herokuapp.com/api/sin-alergenos/${selectedAllergens.join(',')}`
      : 'https://apirecetes-50a9e4e6edb1.herokuapp.com/api/';
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      const filteredRecipes = filterRecipesByAllergens(data, selectedAllergens);
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError(error.message); // Actualizamos el estado de error
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
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <div className='filter-container'>
        <h1>Select allergens to exclude:</h1>
        {renderAllergenCheckboxes()}
      </div>
      
      <div className='recipes-grid'>
        {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : recipes.map((recipe) => (
          <div className='recipe-card' key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.nombre} />
            <h2>{recipe.nombre}</h2>
            <Link to="/formrecipes">
              <button className="editbtn">
                <i className="bx bx-edit"></i>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesBody;
