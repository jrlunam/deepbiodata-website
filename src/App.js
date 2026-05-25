import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Team from './pages/Team';
import Contact from './pages/Contact';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <img src="/Logo.jpeg" alt="DeepBiodata Logo" className="navbar-logo" />
          <div className="nav-links">
          <Link to="/" className="company-name">DeepBiodata</Link>
          <Link to="/works">Our Works</Link>
          <Link to="/team">Our Team</Link>
          <Link to="/contact">Contact</Link> 
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
