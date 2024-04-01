//rafc
//CSS
import '../styles/recipesBody.css'
import { useFetch } from '../useFetch';

const RecipesBody = () => {
  const { data, loading } = useFetch("https://apirecetes-50a9e4e6edb1.herokuapp.com/api/"); 

  return (
  <div className='body'>
    <div className='container'>
      <h1>
        <strong style={{ color: '#66cbbb' }}>Re</strong>
        <strong style={{ color: '#f9b548' }}>ce</strong>
        <strong style={{ color: '#ec2e1e' }}>tas</strong>
      </h1>
      
      <div className='recipes-container'>
        {loading && <p key="loading">Cargando...</p>}
        {data?.map((recipe, index) => (
          <div className='recipe-card' key={recipe.id || index}>
            <strong>Nombre de la receta:</strong> {recipe.nombre}. <br/>
            <strong>Ingredientes:</strong>
            <ul className='ingr'>
              {recipe.ingredientes.split(',').map((ingredient, idx) => (
                <li key={idx}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>


  )
}

export default RecipesBody
