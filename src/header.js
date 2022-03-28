import React from 'react';
import './header.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Personal from './Personal';
import Kurser from './kurser';
import Utbildningar from './utbildningar';
import Ansok from './ansok';

function Header() {
  return (
    <div className="header">
    <Router>
      <div>
        <nav className='navbar-header'>
            <Link className='header-button' to="/Personal">Personal</Link>
            <br />
            <Link className='header-button' to="/kurser">Kurser</Link>
            <br />
            <Link className='header-button' to="/utbildningar">Utbildningar</Link>
            <br />
            <Link className='header-button' to="/ansok">Ansök</Link>
        </nav>
        
         <Routes>
         <Route path="/Personal" element={<Personal />} />
         <Route path='/kurser' element={<Kurser />} />
         <Route path='/utbildningar' element={<Utbildningar />} />
         <Route path='/ansok' element={<Ansok />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default Header;
