import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState("US"); // Default country
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 9;

  return (
    <div>
      <Router>
        <Navbar country={country} setCountry={setCountry} />
        <LoadingBar height={5} color='#f11946' progress={progress} />
        <Routes>
          <Route path="/news-app" element={<Navigate to={`/news-app/${country}`} />} />
          <Route path="/news-app/:country" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} />} />
          <Route path="/news-app/:country/:category" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
}
