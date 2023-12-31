import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
