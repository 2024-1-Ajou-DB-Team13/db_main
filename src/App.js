import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage';
import View from './View';
import DesiredPriceRange from './MainPageComponents/DesiredPriceRange';
import AdToPro from './MainPageComponents/AdToPro';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/view/*" element={<View />} />
          <Route path="/main/*" element={<MainPage />} />
          <Route path="/price" element={<DesiredPriceRange />} />
          <Route path="/adtopro" element={<AdToPro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
