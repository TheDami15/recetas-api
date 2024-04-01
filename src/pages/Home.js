import React from 'react';
//CSS
import '../styles/home.css';
import Header from '../components/Header'; //En el App.js está el Router
import Body from '../components/HomeBody';


const Home = () => {

  return (
    <section>
        <Header></Header>
        <Body></Body>
    </section>
  )
}

export default Home
