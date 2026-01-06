import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Licencia from '../lic.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Licencia></Licencia>
    <App />
  </StrictMode>,
)
