// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TechnicianList from './components/TechnicianList';
import TechnicianForm from './components/TechnicianForm';
import TechnicianView from './components/TechnicianView';
import TechnicianEdit from './components/TechnicianEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechnicianList />} />
        <Route path="/add" element={<TechnicianForm />} />
        <Route path="/view/:id" element={<TechnicianView />} />
        <Route path="/edit/:id" element={<TechnicianEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
