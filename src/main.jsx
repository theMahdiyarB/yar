import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n'; // Import to initialize i18next

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the App component with Suspense */}
    <React.Suspense fallback={<div className="flex justify-center items-center h-screen">Loading translations...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
