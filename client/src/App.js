import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/homePage';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Login from './pages/login/LoginPage';
import DonatePage from './pages/donate-page/DonatePage';
import RegisterPage from './pages/Register/RegisterPage';
import ActivitiesPage from './pages/activities/activities';
import EventsPage from './pages/event/eventsPage';
import VolunteersPage from './pages/volunteers/volunteers';
import ProgramOfficersPage from './pages/program-officers/programOfficers';
import DashboardPage from './pages/dashboard/dashboard';
import SetPassword from './pages/password/setPassword';
import ProfilePage from './pages/profile/profile';
import FeedbackPage from './pages/feedback/feedback';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/program-officers" element={<ProgramOfficersPage />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
