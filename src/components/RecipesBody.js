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
          
          <ul className='rcpul'>
          {loading && <li key="loading">Cargando...</li>}
          {data?.map((recipes, index) => (
            <li className='rcpli' key={recipes.id || index}>
             <strong>Nombre de la receta:</strong> {recipes.nombre}. <br/><strong>Ingredientes:</strong> {recipes.ingredientes}
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default RecipesBody
