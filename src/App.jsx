import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginForm from './api/components/auth/LoginForm';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './api/utils/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Protected Route */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
