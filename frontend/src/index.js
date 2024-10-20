import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WrappedApp from './App';
import reportWebVitals from './reportWebVitals';
import { FacultyProvider } from './context/FacultyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FacultyProvider>
      <WrappedApp />
    </FacultyProvider>
  </React.StrictMode>
);

reportWebVitals();