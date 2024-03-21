import React, { useState } from 'react';
import './App.css';
import dumplin from './img/dumplins.png'
import logo from './img/logo.png' //importamos la imagen de logo
import gluten from './img/gluten.png' //importamos la imagen de facebook
import inst from './img/instagram.png' //importamos la imagen de inst
import gmail from './img/gmail.png' //importamos la imagen de gmail

import './styles/index.css'


function App() {

  const [currentImage, setCurrentImage] = useState(dumplin); // Estado para almacenar la URL de la imagen actual
  const [circleColor, setCircleColor] = useState('#66cbbb'); // Estado para almacenar el color del círculo
  
  function imgSlider(imageUrl) {
    setCurrentImage(imageUrl); // Actualizar el estado con la nueva URL de la imagen
  }

  function changeCircleColor(color) {
    setCircleColor(color); // Actualizar el estado con el nuevo color del círculo
  }


  return (
    <div className='App'>
      <body>
        <section>
        <div className='circle' style={{ background: circleColor }}></div> {/* Establecer el color del círculo */}
            <header>
              <a href=''><img src={logo} className='logo'></img></a>
              <ul>
                <li><a href=''>Home</a></li>
                <li><a href=''>Menu</a></li>
                <li><a href=''>Form</a></li>
              </ul>
            </header>

            <div className='content'>
              <div className='textBox'>
                <h2>It's not just food<br />It's <span>LifeStyle</span></h2>
                <p>Lorem ipsum dolor sit amet,
                   consectetur adipiscing elit.
                   Cras placerat pulvinar commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                </p>
                <a href=''>Learn More</a>
                </div>
              <div className='imgBox'>
                <img src={currentImage} className='food' alt='food'></img>
              </div>
            </div>

            <ul className='thumb'>
              <li><img src={gmail} alt='gmail' onClick={() => { imgSlider(gmail); changeCircleColor('#66cbbb'); }}></img></li>
              <li><img src={gluten} alt='glutenfree' onClick={() => { imgSlider(facebook); changeCircleColor('#f9b548'); }}></img></li>
              <li><img src={inst} alt='instagram' onClick={() => { imgSlider(inst); changeCircleColor('#ec2e1e'); }}></img></li>
            </ul>
        </section>     
     </body>
    </div>
  );
}

export default App;
