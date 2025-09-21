import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Internships from './pages/Internships';
import Placements from './pages/Placements';
import Sponsorship from './pages/Sponsorship';
import MentorApplication from './pages/MentorApplication';
import ProgramApplication from './pages/ProgramApplication';
import Assessment from './pages/Assessment';
import AssessmentAnalytics from './pages/AssessmentAnalytics';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/mentor-application" element={<MentorApplication />} />
          <Route path="/apply" element={<ProgramApplication />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/analytics" element={<AssessmentAnalytics />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
