import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import Team from './pages/Team';
import Contact from './pages/Contact';
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      {/* Add inline styles for mobile menu */}
      <style>
        {`
          @media (max-width: 600px) {
            .nav-links {
              display: none !important;
            }
            
            .nav-links.mobile-menu {
              display: flex !important;
              position: absolute !important;
              top: 100% !important;
              left: 0 !important;
              right: 0 !important;
              background-color: #333 !important;
              flex-direction: column !important;
              padding: 1rem !important;
              z-index: 1001 !important;
              width: 100% !important;
            }
            
            .nav-links.mobile-menu a {
              display: block !important;
              width: 100% !important;
              padding: 12px 16px !important;
              margin: 5px 0 !important;
              background-color: #444 !important;
              color: white !important;
              text-decoration: none !important;
            }
            
            .hamburger {
              display: block !important;
            }
          }
          
          .hamburger {
            display: none;
            font-size: 2rem;
            cursor: pointer;
            color: white;
            margin-left: auto;
          }
        `}
      </style>
      
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