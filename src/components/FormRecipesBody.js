import React from 'react'
//CSS
import '../styles/formRecipesBody.css'
const FormRecipesBody = () => {
  return (
    <div className='bodyrb'>
         <div className='formularioRecipes'>
        <h2>New Recipe</h2>
        <form>
            <label className='labelfrb' for="nombre">Name:</label>
            <input type="text" id="nombre" name="nombre" required></input>

            <label className='labelfrb' for="descripcion">Description:</label>
            <textarea id="descripcion" name="descripcion" rows="4" required></textarea>

            <label className='labelfrb' for="imagen">Img:</label>
            <input type="file" id="imagen" name="imagen"></input>

            <div className='alerg'>
                <label className='labelfrb'>Alérgenos:</label>
                <input type="checkbox" id="huevos" name="alergenos" value="huevos"/>
                <label for="huevos">Huevos</label>
                <input type="checkbox" id="gluten" name="alergenos" value="gluten"/>
                <label for="gluten">Gluten</label>
                <input type="checkbox" id="lacteos" name="alergenos" value="lacteos"/>
                <label for="lacteos">Lácteos</label>
                <input type="checkbox" id="pescado" name="alergenos" value="pescado"/>
                <label for="pescado">Pescado</label>
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

