import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import Team from './pages/Team';
import Contact from './pages/Contact';
import './styles.css';  // ← This should now work

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="navbar-logo" />
          
          <div className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? '✖' : '☰'}
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'mobile-menu' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/works" onClick={() => setIsMenuOpen(false)}>Our Works</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;