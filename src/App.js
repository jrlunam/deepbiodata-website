import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import Team from './pages/Team';
import Contact from './pages/Contact';
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="navbar-logo" />

          {/*<div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </div>*/}

          {/* The Hamburger Button (Only shows on mobile) */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? '✖' : '☰'}
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'mobile-menu' : ''}`}>
              {/* {isMenuOpen && (
    <div className="close-button" onClick={() => setIsMenuOpen(false)}>
      &times;
    </div>
  )} */}
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/works" onClick={() => setIsMenuOpen(false)}>Our Works</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)}>Our Team</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
          {isMenuOpen && (
            <div className="close-button" onClick={() => setIsMenuOpen(false)}>
              &times;
            </div>
    
          )}
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
