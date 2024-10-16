// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import JobListings from './pages/JobListings';
import Proposals from './pages/Proposals';
import Messaging from './pages/Messaging';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute'; // For protected routes

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobListings />
            </PrivateRoute>
          }
        />
        <Route
          path="/proposals"
          element={
            <PrivateRoute>
              <Proposals />
            </PrivateRoute>
          }
        />
        <Route
          path="/messaging"
          element={
            <PrivateRoute>
              <Messaging />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
