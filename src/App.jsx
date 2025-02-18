import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginForm from './api/components/auth/LoginForm';
import Signup from './api/components/auth/Signup';
import Blog from './components/pages/Blog';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './api/utils/AuthProvider';
import Navbar from './components/Navbar';
import ResetPassword from './api/components/auth/passwordreset/ResetPassword';
import PasswordRequest from './api/components/auth/passwordreset/PasswordRequest';
import Policy from './components/pages/Policy';
import PostDetailPage from './components/pages/PostDetailPage';
function App() {
  return (
    <Router>
      {/* Provide authentication context to the entire app */}
      <AuthProvider>
        <Routes>
          {/* Protected Route wrapper */}
          <Route element={<PrivateRoutes />}>
            {/* Navbar should be outside of Routes but inside the Protected Route wrapper */}
            <Route
              path="/home"
              element={
                <>
                  <Navbar />  {/* Render Navbar only for protected routes */}
                  <HomePage />
                </>
              }
            />
            <Route
              path='/my-blogs'
              element={
                <>
                  <Navbar />
                  <Blog />
                </>
              }
            />
            <Route
              path='/post/:id'
              element={
                <>
                  <Navbar />
                  <PostDetailPage />
                </>
              }
            />
          </Route>
   
          

          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/forgot-password" element={<PasswordRequest />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='policy' element={<Policy />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
