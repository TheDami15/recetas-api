import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Pages
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Form from './pages/Form';
import FormRecipes from './pages/FormRecipes';
//CSS
import './styles/index.css';



function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/recipes' Component={Recipes}></Route>
            <Route path='/form' Component={Form}></Route>
            <Route path='/formrecipes' Component={FormRecipes}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
