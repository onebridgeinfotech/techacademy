import React, { useState } from 'react';
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
import ChatbotPage from './pages/ChatbotPage';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import StudentDashboard from './pages/StudentDashboard';
import Testimonials from './pages/Testimonials';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <ErrorBoundary>
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
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
          </main>
          <Footer />
          
          {/* Floating Chatbot */}
          <Chatbot isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
