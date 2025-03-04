import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;