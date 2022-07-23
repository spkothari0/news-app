import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {

  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 9;
  const country = "in";

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={5}
          color='#f11946'
          progress={progress}
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="" pageSize={pageSize} country={country} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />} />
        </Routes>
      </Router>
    </div>
  )

}
