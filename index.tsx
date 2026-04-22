
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Register the PWA service worker with autoUpdate
registerSW({ immediate: true });

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Wrap App with HashRouter to support useNavigate inside App component */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);