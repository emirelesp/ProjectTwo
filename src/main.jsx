import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Licencia from '../lic.jsx'

import { locale, loadMessages } from 'devextreme/localization';
import esMessages from 'devextreme/localization/messages/es.json';

loadMessages(esMessages);
locale('es');


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Licencia></Licencia>
        <App />
  </StrictMode>,
)
