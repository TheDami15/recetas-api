import React from 'react'
import { Link } from 'react-router-dom';
//IMG
import logo from '../img/logo.png' //importamos la imagen de logo
//CSS
import '../styles/header.css'
//Las Rutas están en el App.js

const Header = () => {
  return (
    <div>
        <header>
            <Link to='/'><img src={logo} className='logo'></img></Link>
            <ul>
                <li><Link to='/' className='first'>Home</Link></li> 
                <li><Link to='/recipes' className='second'>Recipes</Link></li>
                <li><Link to='/form' className='third'>Form</Link></li>
            </ul>
        </header>
    </div>
  )
}

export default Header
