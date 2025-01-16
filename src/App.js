import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './views/login';
import SignupPage from './views/signup';
import Homepage from './views/home';
import store from './redux/store';
import authSlice from './redux/slices/authSlice';
import ProtectedRoute from './helpers/protectedRoute';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      store.dispatch(authSlice.actions.login(token));
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
