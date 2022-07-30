import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';

import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <AuthContextProvider>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </AuthContextProvider>
 </React.StrictMode>,
);
