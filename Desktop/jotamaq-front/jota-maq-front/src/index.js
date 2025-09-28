import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

// Buscar o elemento root
const container = document.getElementById('root');

// Verificar se o elemento existe
if (!container) {
  throw new Error('Root element not found! Make sure you have <div id="root"></div> in your public/index.html');
}

// Criar root e renderizar
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);