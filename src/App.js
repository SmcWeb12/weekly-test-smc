import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import SignupPage from './pages/SignupPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import AdminPanel from './pages/AdminPanel';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

const App = () => {
  return (
    <AuthProvider> {/* Wrap your app in AuthProvider */}
      <Router>
        <Routes>
          {/* Redirect from root "/" to the signup page */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
