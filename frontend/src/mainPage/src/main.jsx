// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';
import "../../../index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <HomePage />
    </Router>
  </StrictMode>
);
