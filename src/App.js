import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Team from './pages/Team';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/works">Our Works</Link>
          <Link to="/team">Our Team</Link>
        </nav>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
