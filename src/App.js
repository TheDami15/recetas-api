import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Pages
import Home from './pages/Home';
import Recipes from './pages/Recipes';
//CSS
import './styles/index.css';



function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
            <Route path='/' exact Component={Home}></Route>
            <Route path='/recipes' Component={Recipes}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
