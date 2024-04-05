import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//CSS
import '../styles/formRecipesBody.css'

const FormRecipesBody = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('recipeId');
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    nombre: '',
    ingredientes: '',
    image: '',
    alergenos: []
  });

  // Función para obtener los detalles de la receta desde la API
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://apirecetes-50a9e4e6edb1.herokuapp.com/api/${id}`);
        setRecipeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, type, value, files } = event.target;
    if (type === 'file') {
      setRecipeData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setRecipeData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRecipeData(prevState => ({
        ...prevState,
        alergenos: [...prevState.alergenos, value]
      }));
    } else {
      setRecipeData(prevState => ({
        ...prevState,
        alergenos: prevState.alergenos.filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    try {
      let response;
      const formData = new FormData();
      formData.append('nombre', recipeData.nombre);
      formData.append('ingredientes', recipeData.ingredientes);
      recipeData.alergenos.forEach(alergeno => formData.append('alergenos[]', alergeno));

      // Añadir la imagen solo si se está creando una receta nueva
      if (!id && recipeData.image) formData.append('image', recipeData.image);

      if (id) {
        // Caso de actualización
        // Aquí se asume que la actualización no necesita enviar la imagen
        const dataForUpdate = {
          nombre: recipeData.nombre,
          ingredientes: recipeData.ingredientes,
          alergenos: recipeData.alergenos,
        };
        response = await axios.put(`https://apirecetes-50a9e4e6edb1.herokuapp.com/api/${id}`, dataForUpdate, { headers });
      } else {
        // Caso de creación
        response = await axios.post('https://apirecetes-50a9e4e6edb1.herokuapp.com/api/', formData, { headers });
      }

      console.log(id ? 'Recipe updated:' : 'Recipe created:', response.data);
      // Redireccionar al usuario
      navigate('/recipes');

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='bodyrb'>
      <div className='formularioRecipes'>
        <h2>New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label className='labelfrb' htmlFor="nombre">Name:</label>
          <input type="text" id="nombre" name="nombre" value={recipeData.nombre} onChange={handleInputChange} required></input>

          <label className='labelfrb' htmlFor="ingredientes">Description:</label>
          <textarea id="ingredientes" name="ingredientes" rows="4" value={recipeData.ingredientes} onChange={handleInputChange} required />

          {
            !id && (
              <div>
                <label className='labelfrb' htmlFor="imagen">Img:</label>
                <input type="file" id="imagen" name="image" onChange={handleInputChange} required></input>
              </div>
            )
          }


          <div className='alerg'>
            <label className='labelfrb'>Alérgenos:</label>
            <input type="checkbox" id="huevos" name="alergenos" value="huevos" checked={recipeData.alergenos.includes('huevos')} onChange={handleCheckboxChange} />
            <label htmlFor="huevos">Huevos</label>
            <input type="checkbox" id="gluten" name="alergenos" value="gluten" checked={recipeData.alergenos.includes('gluten')} onChange={handleCheckboxChange} />
            <label htmlFor="gluten">Gluten</label>
            <input type="checkbox" id="lacteos" name="alergenos" value="lacteos" checked={recipeData.alergenos.includes('lácteos')} onChange={handleCheckboxChange} />
            <label htmlFor="lacteos">Lácteos</label>
            <input type="checkbox" id="pescado" name="alergenos" value="pescado" checked={recipeData.alergenos.includes('pescado')} onChange={handleCheckboxChange} />
            <label htmlFor="pescado">Pescado</label>
            <input type="checkbox" id="vegano" name="alergenos" value="vegano" checked={recipeData.alergenos.includes('vegano')} onChange={handleCheckboxChange} />
            <label htmlFor="vegano">Vegano</label>
            <input type="checkbox" id="sugar-free" name="alergenos" value="sugar-free" checked={recipeData.alergenos.includes('sugar-free')} onChange={handleCheckboxChange} />
            <label htmlFor="sugar-free">Sugar-free</label>
          </div>
          <div className='btnsub'>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default FormRecipesBody

