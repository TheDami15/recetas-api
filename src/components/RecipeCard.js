import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, deleteRecipe, displayActionButtons }) => {
  return (
    <div className='recipe-card' key={recipe._id}>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      <img src={recipe.imageUrl} alt={recipe.nombre} />
      <h2>{recipe.nombre}</h2>
      {displayActionButtons && (
        <>
          <Link to={`/formrecipes?recipeId=${recipe._id}`}>
            <button className="editbtn">
              <i className="bx bx-edit"></i>
            </button>
          </Link>

          <button className="deletebtn" onClick={() => deleteRecipe(recipe._id)}>
            <i className='bx bx-x-circle'></i>
          </button>
        </>
      )}
    </div>
  );
};

export default RecipeCard;
