import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Front from './components/Front';
import Markdown from './components/Markdown';

function App() {
  return (
    <div style={{ fontFamily: 'monsteerat' }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Front />} />
          <Route exact path="/Markdown" element={<Markdown />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
