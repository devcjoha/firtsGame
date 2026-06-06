import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 🛡️ Importamos e inicializamos tu escudo de errores aquí mismo:
import { initErrorShield } from './utils/manejarErrores.js';
initErrorShield();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
</StrictMode>,
)
