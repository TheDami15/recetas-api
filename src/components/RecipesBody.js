import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/recipesBody.css';

const RecipesBody = () => {
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const commonAllergens = ['huevos', 'gluten', 'lácteos', 'pescado'];

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
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
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
      
      <div className='recipes-grid'>
        {loading ? <p>Cargando...</p> : recipes.map((recipe) => (
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
