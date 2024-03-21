import React, { useState } from 'react';
import './App.css';
import dumplin from './img/dumplins.png'
import logo from './img/logo.png' //importamos la imagen de logo
import gluten from './img/gluten.png' 
import vegano from './img/vegano.png' 
import sugar from './img/sugarfree.png' 


import './styles/index.css'


function App() {

  const [currentImage, setCurrentImage] = useState(dumplin); // Estado para almacenar la URL de la imagen actual
  const [circleColor, setCircleColor] = useState('#66cbbb'); // Estado para almacenar el color del círculo
  
  function imgSlider(imageUrl) {
    setCurrentImage(imageUrl); // Actualizar el estado con la nueva URL de la imagen
  }

  function changeCircleColor(color) {
    setCircleColor(color); // Actualizar el estado con el nuevo color del círculo
        // Cambiar el color del span
        document.querySelector('h2 span').style.color = color;
  }


  return (
    <div className='App'>
      <body>
        <section>
        <div className='circle' style={{ background: circleColor }}></div> {/* Establecer el color del círculo */}
            <header>
              <a href=''><img src={logo} className='logo'></img></a>
              <ul>
                <li><a href='#' className='first'>Home</a></li>
                <li><a href='#' className='second'>Menu</a></li>
                <li><a href='#' className='third'>Form</a></li>
              </ul>
            </header>

            <div className='content'>
              <div className='textBox'>
                <h2>It's not just food<br />It's <span>LifeStyle</span></h2>
                <p>Lorem ipsum dolor sit amet,
                   consectetur adipiscing elit.
                   Cras placerat pulvinar commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                </p>
                <a href='' style={{ background: circleColor }} >Learn More</a>
                </div>
              <div className='imgBox'>
                <img src={currentImage} className='food' alt='food'></img>
              </div>
            </div>

            <ul className='thumb'>
              <li><img src={vegano} alt='gmail' onClick={() => { imgSlider(vegano); changeCircleColor('#66cbbb'); }}></img></li>
              <li><img src={gluten} alt='glutenfree' onClick={() => { imgSlider(gluten); changeCircleColor('#f9b548'); }}></img></li>
              <li><img src={sugar} alt='instagram' onClick={() => { imgSlider(sugar); changeCircleColor('#ec2e1e'); }}></img></li>
            </ul>
        </section>     
     </body>
    </div>
  );
}

export default App;
