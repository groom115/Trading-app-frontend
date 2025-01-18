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
import UserTable from './views/userTable';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('app', localStorage, token)

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
              <ProtectedRoute path="/">
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/table"
            element={
              <ProtectedRoute path="/table">
                <UserTable />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
