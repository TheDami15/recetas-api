import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate en lugar de useHistory
//IMG
import dumplin from '../img/dumplins.png'
import gluten from '../img/gluten.png'
import vegano from '../img/vegano.png'
import sugar from '../img/sugarfree.png'
//CSS
import '../styles/homeBody.css'

const HomeBody = () => {
  const [currentImage, setCurrentImage] = useState(dumplin); // Estado para almacenar la URL de la imagen actual
  const [circleColor, setCircleColor] = useState('#66cbbb'); // Estado para almacenar el color del círculo
  const [selectedFilter, setSelectedFilter] = useState('');
  const navigate = useNavigate(); // useNavigate en lugar de useHistory

  function imgSlider(imageUrl) {
    setCurrentImage(imageUrl); // Actualizar el estado con la nueva URL de la imagen
  }

  const navigateToRecipes = () => {
    navigate(`/recipes?filter=${selectedFilter}`); // Usar navigate en lugar de history.push
  };

  function changeCircleColor(color) {
    setCircleColor(color); // Actualizar el estado con el nuevo color del círculo
    // Cambiar el color del span
    document.querySelector('h2 span').style.color = color;
  }

  return (
    <div>
      <div className='circle' style={{ background: circleColor }}></div>
      <div className='content'>
        <div className='textBox'>
          <h2>It's not just food<br />It's <span>LifeStyle</span></h2>
          <p>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Cras placerat pulvinar commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <a onClick={navigateToRecipes} style={{ background: circleColor, cursor: 'pointer' }}>Learn More</a>
        </div>
        <div className='imgBox'>
          <img src={currentImage} className='food' alt='food'></img>
        </div>
      </div>

      <ul className='thumb'>
        <li><img src={gluten} alt='gluten' onClick={() => { imgSlider(gluten); changeCircleColor('#f9b548'); setSelectedFilter('gluten'); }}></img></li>
        <li><img src={vegano} alt='vegano' onClick={() => { imgSlider(vegano); changeCircleColor('#f37f34'); setSelectedFilter('vegano'); }}></img></li>
        <li><img src={sugar} alt='sugar-free' onClick={() => { imgSlider(sugar); changeCircleColor('#ec2e1e'); setSelectedFilter('sugar-free'); }}></img></li>
      </ul>
    </div>
  )
}

export default HomeBody
