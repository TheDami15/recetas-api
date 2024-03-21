import React from 'react'
//IMG
import logo from '../img/logo.png' //importamos la imagen de logo
//CSS
import '../styles/header.css'


const Header = () => {
  return (
    <div>
        <header>
            <a href=''><img src={logo} className='logo'></img></a>
            <ul>
                <li><a href='#' className='first'>Home</a></li>
                <li><a href='#' className='second'>Menu</a></li>
                <li><a href='#' className='third'>Form</a></li>
            </ul>
        </header>
    </div>
  )
}

export default Header
