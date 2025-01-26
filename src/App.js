import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom'; // Use HashRouter
import DataAnalytics from './components/DataAnalytics';
import EVRegistration from './components/EVRegistration';
import EVSelection from './components/EVSelection';
import LogForm from './components/LogForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Set Login page as the initial page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ev-registration" element={<EVRegistration />} />
        <Route path="/ev-selection" element={<EVSelection />} />
        
        {/* Updated LogForm route */}
        <Route path="/log-form/:selectedEV" element={<LogForm />} /> {/* Pass selected EV via URL */}

        {/* Data Analytics Route */}
        <Route path="/data-analytics" element={<DataAnalytics />} /> {/* Separate route for data analytics */}
      </Routes>
    </Router>
  );
}

export default App;
