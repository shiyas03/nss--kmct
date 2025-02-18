import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/homePage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/LoginPage';
import DonatePage from './pages/donate-page/DonatePage';
import RegisterPage from './pages/Register/RegisterPage';
import NavBar from './components/nav-bar/NavBar';
import ActivitiesPage from './pages/activities/activities';
import API from './services/api';
import EventsPage from './pages/event/eventsPage';
import VolunteersPage from './pages/volunteers/volunteers';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await API.get('/auth/me');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error.response?.data?.msg || error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      < NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/admin/volunteers" element={<VolunteersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
