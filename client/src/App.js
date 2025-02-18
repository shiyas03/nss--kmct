import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/homePage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/LoginPage';
import DonatePage from './pages/donate-page/DonatePage';
import RegisterPage from './pages/Register/RegisterPage';
import NavBar from './components/nav-bar/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
