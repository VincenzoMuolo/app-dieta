import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
