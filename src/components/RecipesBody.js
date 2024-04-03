import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/recipesBody.css';

const RecipesBody = () => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
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
    const endpoint = selectedAllergens.length > 0
      ? `https://apirecetes-50a9e4e6edb1.herokuapp.com/api/sin-alergenos/${selectedAllergens.join(',')}`
      : 'https://apirecetes-50a9e4e6edb1.herokuapp.com/api/';
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='body'>
      
      
      <div className='recipes-grid'>
        {loading ? <p>Cargando...</p> : recipes.map((recipe) => (
          <div className='recipe-card' key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.nombre} />
            <h2>{recipe.nombre}</h2>
          </div>
        ))}
      </div>
      <div className='filter-container'>
        <h1>Select allergens to exclude:</h1>
        {commonAllergens.map(allergen => (
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
        ))}
      </div>
    </div>
    
  );
};

export default RecipesBody;
